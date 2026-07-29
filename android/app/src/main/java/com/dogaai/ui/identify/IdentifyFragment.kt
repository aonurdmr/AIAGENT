package com.dogaai.ui.identify

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.dogaai.databinding.FragmentIdentifyBinding
import com.dogaai.util.FileUtil
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.launch

@AndroidEntryPoint
class IdentifyFragment : Fragment() {

    private var _binding: FragmentIdentifyBinding? = null
    private val binding get() = _binding!!
    private val vm: IdentifyViewModel by viewModels()

    private val pickImage = registerForActivityResult(ActivityResultContracts.GetContent()) { uri ->
        uri?.let {
            vm.setImage(it)
            Glide.with(this).load(it).centerCrop().into(binding.ivPreview)
            binding.btnIdentify.isEnabled = true
        }
    }

    private val takePhoto = registerForActivityResult(ActivityResultContracts.TakePicture()) { ok ->
        if (ok) {
            val uri = vm.state.value.imageUri ?: return@registerForActivityResult
            Glide.with(this).load(uri).centerCrop().into(binding.ivPreview)
            binding.btnIdentify.isEnabled = true
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?
    ): View {
        _binding = FragmentIdentifyBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnGallery.setOnClickListener { pickImage.launch("image/*") }
        binding.btnCamera.setOnClickListener {
            val uri = FileUtil.createImageUri(requireContext())
            vm.setImage(uri)
            takePhoto.launch(uri)
        }
        binding.btnIdentify.setOnClickListener {
            val uri = vm.state.value.imageUri ?: return@setOnClickListener
            val file = FileUtil.uriToFile(requireContext(), uri) ?: return@setOnClickListener
            vm.identify(file)
        }

        lifecycleScope.launch {
            vm.state.collectLatest { state ->
                binding.progressBar.isVisible = state.loading
                binding.btnIdentify.isEnabled = !state.loading && state.imageUri != null

                state.error?.let {
                    Toast.makeText(requireContext(), it, Toast.LENGTH_LONG).show()
                }

                state.result?.let { r ->
                    binding.cardResult.isVisible = true
                    binding.tvSpecies.text = r.species
                    binding.tvScientific.text = r.scientificName
                    binding.tvConfidence.text = "${(r.confidence * 100).toInt()}% güven"
                    binding.tvDescription.text = r.description
                    binding.tvHabitat.text = r.habitat
                    binding.tvSeason.text = r.season
                    binding.tvTips.text = r.tips.joinToString("\n• ", "• ")
                    binding.tvProtected.isVisible = r.isProtected
                } ?: run { binding.cardResult.isVisible = false }
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
