import requests
import sys
import json
from datetime import datetime
import time

class MetaAIBackendTester:
    def __init__(self, base_url="https://geniushub.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.session_id = None
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=timeout)

            print(f"   Status: {response.status_code}")
            
            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    self.log_test(name, True)
                    return True, response_data
                except:
                    self.log_test(name, True, "No JSON response")
                    return True, {}
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                try:
                    error_detail = response.json()
                    error_msg += f" - {error_detail}"
                except:
                    error_msg += f" - {response.text[:100]}"
                
                self.log_test(name, False, error_msg)
                return False, {}

        except requests.exceptions.Timeout:
            self.log_test(name, False, f"Request timeout after {timeout}s")
            return False, {}
        except Exception as e:
            self.log_test(name, False, f"Request error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "", 200)

    def test_get_agents(self):
        """Test getting all agents"""
        success, response = self.run_test("Get Agents", "GET", "agents", 200)
        
        if success:
            # Verify we have 11 agents
            expected_agents = ['research', 'design', 'content', 'code', 'planner', 
                             'publisher', 'report', 'memory', 'cost', 'growth', 'safety']
            
            missing_agents = [agent for agent in expected_agents if agent not in response]
            if missing_agents:
                self.log_test("Agent Count Validation", False, f"Missing agents: {missing_agents}")
                return False, response
            else:
                self.log_test("Agent Count Validation", True, "All 11 agents present")
        
        return success, response

    def test_create_session(self):
        """Test creating a new chat session"""
        test_data = {
            "name": f"Test Session - {datetime.now().strftime('%H:%M:%S')}",
            "agent_type": "research"
        }
        
        success, response = self.run_test("Create Session", "POST", "sessions", 200, test_data)
        
        if success and 'id' in response:
            self.session_id = response['id']
            print(f"   Created session ID: {self.session_id}")
        
        return success, response

    def test_get_sessions(self):
        """Test getting all sessions"""
        return self.run_test("Get Sessions", "GET", "sessions", 200)

    def test_send_message(self):
        """Test sending a message to an agent"""
        if not self.session_id:
            self.log_test("Send Message", False, "No session ID available")
            return False, {}
        
        test_data = {
            "session_id": self.session_id,
            "agent_type": "research",
            "content": "Merhaba, yapay zeka hakkında kısa bir bilgi verebilir misin?"
        }
        
        # Increase timeout for AI response
        success, response = self.run_test("Send Message", "POST", "chat", 200, test_data, timeout=60)
        
        if success:
            # Verify response has required fields
            required_fields = ['id', 'session_id', 'agent_type', 'role', 'content', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                self.log_test("Message Response Validation", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Message Response Validation", True, "All required fields present")
                
                # Check if we got a meaningful response
                if len(response.get('content', '')) > 10:
                    self.log_test("AI Response Quality", True, f"Response length: {len(response['content'])} chars")
                else:
                    self.log_test("AI Response Quality", False, "Response too short or empty")
        
        return success, response

    def test_get_messages(self):
        """Test getting messages for a session"""
        if not self.session_id:
            self.log_test("Get Messages", False, "No session ID available")
            return False, {}
        
        return self.run_test("Get Messages", "GET", f"chat/{self.session_id}/messages", 200)

    def test_generate_image(self):
        """Test image generation"""
        test_data = {
            "prompt": "A beautiful sunset over mountains, digital art style",
            "agent_session_id": self.session_id
        }
        
        # Increase timeout for image generation
        success, response = self.run_test("Generate Image", "POST", "generate-image", 200, test_data, timeout=90)
        
        if success:
            # Verify response has required fields
            required_fields = ['image_base64', 'prompt', 'timestamp']
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                self.log_test("Image Response Validation", False, f"Missing fields: {missing_fields}")
            else:
                self.log_test("Image Response Validation", True, "All required fields present")
                
                # Check if we got a base64 image
                image_data = response.get('image_base64', '')
                if len(image_data) > 1000:  # Base64 images should be quite long
                    self.log_test("Image Data Quality", True, f"Image data length: {len(image_data)} chars")
                else:
                    self.log_test("Image Data Quality", False, "Image data too short or empty")
        
        return success, response

    def test_delete_session(self):
        """Test deleting a session"""
        if not self.session_id:
            self.log_test("Delete Session", False, "No session ID available")
            return False, {}
        
        return self.run_test("Delete Session", "DELETE", f"sessions/{self.session_id}", 200)

    def test_invalid_agent_type(self):
        """Test error handling with invalid agent type"""
        test_data = {
            "name": "Invalid Agent Test",
            "agent_type": "invalid_agent"
        }
        
        success, response = self.run_test("Invalid Agent Type", "POST", "sessions", 400, test_data)
        return success, response

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Meta AI Orchestrator Backend Tests")
        print(f"🌐 Testing against: {self.base_url}")
        print("=" * 60)

        # Basic connectivity tests
        self.test_root_endpoint()
        
        # Agent configuration tests
        self.test_get_agents()
        
        # Session management tests
        self.test_create_session()
        self.test_get_sessions()
        
        # Chat functionality tests
        if self.session_id:
            self.test_send_message()
            time.sleep(2)  # Brief pause between tests
            self.test_get_messages()
        
        # Image generation tests
        self.test_generate_image()
        
        # Cleanup tests
        self.test_delete_session()
        
        # Error handling tests
        self.test_invalid_agent_type()

        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary:")
        print(f"   Total Tests: {self.tests_run}")
        print(f"   Passed: {self.tests_passed}")
        print(f"   Failed: {self.tests_run - self.tests_passed}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        # Print failed tests
        failed_tests = [result for result in self.test_results if not result['success']]
        if failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in failed_tests:
                print(f"   - {test['test']}: {test['details']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = MetaAIBackendTester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())