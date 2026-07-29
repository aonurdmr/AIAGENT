package com.dogaai.ui.chat

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dogaai.data.api.ApiService
import com.dogaai.data.model.ChatRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import java.util.UUID
import javax.inject.Inject

data class ChatMessage(val role: String, val content: String)  // "user" | "assistant"

data class ChatUiState(
    val messages: List<ChatMessage> = emptyList(),
    val loading: Boolean = false,
    val sessionId: String = UUID.randomUUID().toString()
)

@HiltViewModel
class ChatViewModel @Inject constructor(
    private val api: ApiService
) : ViewModel() {

    private val _state = MutableStateFlow(ChatUiState())
    val state: StateFlow<ChatUiState> = _state

    fun sendMessage(text: String, context: String = "fishing") {
        val userMsg = ChatMessage("user", text)
        _state.value = _state.value.copy(
            messages = _state.value.messages + userMsg,
            loading = true
        )
        viewModelScope.launch {
            try {
                val response = api.chat(ChatRequest(text, _state.value.sessionId, context))
                if (response.isSuccessful) {
                    val reply = response.body()!!
                    val assistantMsg = ChatMessage("assistant", reply.response)
                    _state.value = _state.value.copy(
                        messages = _state.value.messages + assistantMsg,
                        loading = false,
                        sessionId = reply.sessionId
                    )
                } else {
                    _state.value = _state.value.copy(loading = false)
                }
            } catch (e: Exception) {
                val errMsg = ChatMessage("assistant", "Bağlantı hatası: ${e.message}")
                _state.value = _state.value.copy(
                    messages = _state.value.messages + errMsg,
                    loading = false
                )
            }
        }
    }

    fun clearChat() {
        _state.value = ChatUiState()
    }
}
