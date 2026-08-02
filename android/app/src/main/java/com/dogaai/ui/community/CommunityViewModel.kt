package com.dogaai.ui.community

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dogaai.data.api.ApiService
import com.dogaai.data.model.Post
import com.dogaai.data.model.PostCreateRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class CommunityUiState(
    val loading: Boolean = false,
    val posts: List<Post> = emptyList(),
    val error: String? = null
)

@HiltViewModel
class CommunityViewModel @Inject constructor(
    private val api: ApiService
) : ViewModel() {

    private val _state = MutableStateFlow(CommunityUiState(loading = true))
    val state: StateFlow<CommunityUiState> = _state

    init { loadPosts() }

    fun loadPosts(category: String? = null) {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true)
            try {
                val posts = api.getPosts(limit = 30, category = category).body() ?: emptyList()
                _state.value = CommunityUiState(posts = posts)
            } catch (e: Exception) {
                _state.value = CommunityUiState(error = e.message)
            }
        }
    }

    fun likePost(id: String) {
        viewModelScope.launch {
            try { api.likePost(id) } catch (_: Exception) {}
            loadPosts()
        }
    }

    fun createPost(title: String, content: String, category: String, location: String?) {
        viewModelScope.launch {
            try {
                api.createPost(PostCreateRequest(title, content, category, location))
                loadPosts()
            } catch (e: Exception) {
                _state.value = _state.value.copy(error = e.message)
            }
        }
    }
}
