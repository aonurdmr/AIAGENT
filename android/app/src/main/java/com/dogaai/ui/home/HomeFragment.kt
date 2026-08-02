package com.dogaai.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import androidx.navigation.fragment.findNavController
import com.dogaai.R
import com.dogaai.databinding.FragmentHomeBinding
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@AndroidEntryPoint
class HomeFragment : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private val vm: HomeViewModel by viewModels()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnIdentify.setOnClickListener { findNavController().navigate(R.id.identifyFragment) }
        binding.btnMap.setOnClickListener { findNavController().navigate(R.id.mapFragment) }
        binding.btnChat.setOnClickListener { findNavController().navigate(R.id.chatFragment) }
        binding.btnActivity.setOnClickListener { findNavController().navigate(R.id.activityFragment) }

        lifecycleScope.launch {
            vm.state.collectLatest { state ->
                binding.progressBar.isVisible = state.loading

                state.stats?.let {
                    binding.tvStatSpots.text = it.totalSpots.toString()
                    binding.tvStatSpecies.text = "${it.speciesIdentified / 1000.0}K"
                    binding.tvStatUsers.text = "${it.activeUsers / 1000.0}K"
                }

                state.weather?.let { w ->
                    binding.tvTemp.text = "${w.temperature}°C"
                    binding.tvConditions.text = "${w.conditions} · ${w.windSpeed} km/s"
                    binding.tvActivityScore.text = w.activityScore.toString()
                    binding.tvWeatherTip.text = w.tips.firstOrNull() ?: ""
                    binding.tvWeatherWarning.isVisible = w.warning != null
                    binding.tvWeatherWarning.text = w.warning ?: ""
                }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
