package com.dogaai.ui.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dogaai.data.api.ApiService
import com.dogaai.data.model.Post
import com.dogaai.data.model.StatsResponse
import com.dogaai.data.model.WeatherRequest
import com.dogaai.data.model.WeatherResponse
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

data class HomeUiState(
    val loading: Boolean = false,
    val stats: StatsResponse? = null,
    val weather: WeatherResponse? = null,
    val recentPosts: List<Post> = emptyList()
)

@HiltViewModel
class HomeViewModel @Inject constructor(
    private val api: ApiService
) : ViewModel() {

    private val _state = MutableStateFlow(HomeUiState(loading = true))
    val state: StateFlow<HomeUiState> = _state

    init { loadAll() }

    fun loadAll(lat: Double = 41.0, lng: Double = 29.0) {
        viewModelScope.launch {
            _state.value = _state.value.copy(loading = true)
            try {
                val stats = api.getStats().body()
                val weather = api.getWeather(WeatherRequest(lat, lng)).body()
                val posts = api.getPosts(limit = 3).body() ?: emptyList()
                _state.value = HomeUiState(loading = false, stats = stats, weather = weather, recentPosts = posts)
            } catch (e: Exception) {
                _state.value = _state.value.copy(loading = false)
            }
        }
    }
}
