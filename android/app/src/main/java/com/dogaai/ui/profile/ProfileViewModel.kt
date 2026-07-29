package com.dogaai.ui.profile

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dogaai.data.model.UserPublic
import com.dogaai.data.repository.AuthRepository
import com.dogaai.data.repository.Result
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class ProfileUiState(
    val user: UserPublic? = null,
    val loading: Boolean = false,
    val error: String? = null,
    val loggedOut: Boolean = false
)

@HiltViewModel
class ProfileViewModel @Inject constructor(
    private val repo: AuthRepository
) : ViewModel() {

    private val _state = MutableStateFlow(ProfileUiState(loading = true))
    val state: StateFlow<ProfileUiState> = _state

    init {
        viewModelScope.launch {
            val cached = repo.getCachedUser()
            _state.value = ProfileUiState(user = cached)
            // Refresh from server
            when (val result = repo.getMe()) {
                is Result.Success -> _state.value = ProfileUiState(user = result.data)
                is Result.Error   -> _state.value = _state.value.copy(loading = false)
                else -> Unit
            }
        }
    }

    fun logout() {
        viewModelScope.launch {
            repo.logout()
            _state.value = ProfileUiState(loggedOut = true)
        }
    }
}
