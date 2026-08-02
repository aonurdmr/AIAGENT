package com.dogaai.ui.auth

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

data class AuthUiState(
    val loading: Boolean = false,
    val user: UserPublic? = null,
    val error: String? = null,
    val isLoggedIn: Boolean = false
)

@HiltViewModel
class AuthViewModel @Inject constructor(
    private val repo: AuthRepository
) : ViewModel() {

    private val _state = MutableStateFlow(AuthUiState())
    val state: StateFlow<AuthUiState> = _state

    init {
        viewModelScope.launch {
            val loggedIn = repo.isLoggedIn()
            val user = if (loggedIn) repo.getCachedUser() else null
            _state.value = AuthUiState(isLoggedIn = loggedIn, user = user)
        }
    }

    fun login(email: String, password: String) {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true, error = null)
            when (val result = repo.login(email, password)) {
                is Result.Success -> _state.value = AuthUiState(user = result.data, isLoggedIn = true)
                is Result.Error   -> _state.value = _state.value.copy(loading = false, error = result.message)
                else -> Unit
            }
        }
    }

    fun register(username: String, email: String, password: String, fullName: String) {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true, error = null)
            when (val result = repo.register(username, email, password, fullName)) {
                is Result.Success -> _state.value = AuthUiState(user = result.data, isLoggedIn = true)
                is Result.Error   -> _state.value = _state.value.copy(loading = false, error = result.message)
                else -> Unit
            }
        }
    }

    fun logout() {
        viewModelScope.launch {
            repo.logout()
            _state.value = AuthUiState()
        }
    }

    fun clearError() {
        _state.value = _state.value.copy(error = null)
    }
}
