package com.dogaai.ui.activity

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.dogaai.data.db.entity.ActivityEntity
import com.dogaai.data.model.ActivityCreateRequest
import com.dogaai.data.repository.ActivityRepository
import com.dogaai.data.repository.Result
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ActivityViewModel @Inject constructor(
    private val repo: ActivityRepository
) : ViewModel() {

    val activities: StateFlow<List<ActivityEntity>> = repo.observeActivities()
        .stateIn(viewModelScope, SharingStarted.Eagerly, emptyList())

    val error = MutableStateFlow<String?>(null)
    val saveSuccess = MutableStateFlow(false)

    init {
        viewModelScope.launch { repo.refreshActivities() }
    }

    fun logActivity(
        type: String, species: String?, location: String?,
        count: Int, weight: Double?, notes: String
    ) {
        viewModelScope.launch {
            val result = repo.logActivity(
                ActivityCreateRequest(type, species, location, count, weight, notes)
            )
            when (result) {
                is Result.Success -> saveSuccess.value = true
                is Result.Error   -> error.value = result.message
                else -> Unit
            }
        }
    }

    fun clearSaveSuccess() { saveSuccess.value = false }
}
