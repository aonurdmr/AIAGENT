package com.dogaai.ui.map

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dogaai.data.db.entity.SpotEntity
import com.dogaai.data.model.SpotCreateRequest
import com.dogaai.data.repository.Result
import com.dogaai.data.repository.SpotRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class MapViewModel @Inject constructor(
    private val repo: SpotRepository
) : ViewModel() {

    private val _activeType = MutableStateFlow<String?>(null)
    val spots: StateFlow<List<SpotEntity>> = repo.observeSpots()
        .stateIn(viewModelScope, SharingStarted.Eagerly, emptyList())

    val error = MutableStateFlow<String?>(null)
    val loading = MutableStateFlow(false)

    init { refresh() }

    fun filterByType(type: String?) {
        _activeType.value = type
        refresh(type)
    }

    fun refresh(type: String? = _activeType.value) {
        viewModelScope.launch {
            loading.value = true
            val result = repo.refreshSpots(type)
            if (result is Result.Error) error.value = result.message
            loading.value = false
        }
    }

    fun addSpot(name: String, desc: String, type: String, lat: Double, lng: Double) {
        viewModelScope.launch {
            val result = repo.createSpot(SpotCreateRequest(name, desc, type, lat, lng))
            if (result is Result.Error) error.value = result.message
        }
    }
}
