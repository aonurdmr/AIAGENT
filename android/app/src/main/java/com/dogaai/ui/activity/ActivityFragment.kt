package com.dogaai.ui.activity

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import com.dogaai.databinding.FragmentActivityBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@AndroidEntryPoint
class ActivityFragment : Fragment() {

    private var _binding: FragmentActivityBinding? = null
    private val binding get() = _binding!!
    private val vm: ActivityViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentActivityBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnLog.setOnClickListener {
            val type = binding.spinnerType.selectedItem.toString()
            val species = binding.etSpecies.text.toString().trim().ifEmpty { null }
            val location = binding.etLocation.text.toString().trim().ifEmpty { null }
            val count = binding.etCount.text.toString().toIntOrNull() ?: 1
            val weight = binding.etWeight.text.toString().toDoubleOrNull()
            val notes = binding.etNotes.text.toString().trim()
            vm.logActivity(type, species, location, count, weight, notes)
        }

        lifecycleScope.launch {
            vm.saveSuccess.collectLatest { ok ->
                if (ok) {
                    Toast.makeText(requireContext(), "Aktivite kaydedildi!", Toast.LENGTH_SHORT).show()
                    vm.clearSaveSuccess()
                    clearForm()
                }
            }
        }

        lifecycleScope.launch {
            vm.error.collectLatest { err ->
                err?.let { Toast.makeText(requireContext(), it, Toast.LENGTH_LONG).show() }
            }
        }
    }

    private fun clearForm() {
        binding.etSpecies.text?.clear()
        binding.etLocation.text?.clear()
        binding.etCount.setText("1")
        binding.etWeight.text?.clear()
        binding.etNotes.text?.clear()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
