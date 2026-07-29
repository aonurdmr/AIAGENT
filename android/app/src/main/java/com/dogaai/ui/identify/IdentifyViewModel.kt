package com.dogaai.ui.identify

import android.net.Uri
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dogaai.data.api.ApiService
import com.dogaai.data.model.IdentifyResponse
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import java.io.File
import javax.inject.Inject

data class IdentifyUiState(
    val loading: Boolean = false,
    val result: IdentifyResponse? = null,
    val error: String? = null,
    val imageUri: Uri? = null
)

@HiltViewModel
class IdentifyViewModel @Inject constructor(
    private val api: ApiService
) : ViewModel() {

    private val _state = MutableStateFlow(IdentifyUiState())
    val state: StateFlow<IdentifyUiState> = _state

    fun setImage(uri: Uri) {
        _state.value = _state.value.copy(imageUri = uri, result = null, error = null)
    }

    fun identify(file: File, activity: String = "fishing") {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true, error = null)
            try {
                val body = file.asRequestBody("image/*".toMediaType())
                val part = MultipartBody.Part.createFormData("image", file.name, body)
                val response = api.identify(part, activity)
                if (response.isSuccessful) {
                    _state.value = _state.value.copy(loading = false, result = response.body())
                } else {
                    _state.value = _state.value.copy(loading = false, error = "Tanımlama başarısız")
                }
            } catch (e: Exception) {
                _state.value = _state.value.copy(loading = false, error = e.message ?: "Hata oluştu")
            }
        }
    }

    fun clearResult() {
        _state.value = IdentifyUiState()
    }
}
