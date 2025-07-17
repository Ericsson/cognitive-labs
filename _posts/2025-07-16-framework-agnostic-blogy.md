---
title: Framework-Agnostic Libraries are needed
author: lucia-ferrer
tags:
  - Engineering
excerpt: The explosion of deep learning has made AI software more than a research endeavor. It's now a business-critical asset. As AI goes from prototype to product, the underlying infrastructure grows with it. The tools? Diverse. The choices? Fragmented. The frameworks? A bit of a mess. And that mess? It’s increasingly a blocker.
---

Deep learning has grown fast, *really fast*. It's now a major part of how companies make decisions and design products. With this boom, AI has become more powerful, but also way more complex. One big challenge? The explosion of tools and frameworks. We're now living in a world full layers of complexity to build on top of backends[^1]. Diverse frameworks are coexisting such as TensorFlow, PyTorch, JAX, MXNet, and more, each with its own quirks and tradeoffs.

For machine learning engineers, it’s like walking through a forest where every path leads to a different framework, and no one’s really sure which one will still exist in five years.

## So, what’s the issue?

These days, building AI-powered products isn’t optional — it’s expected [^2]. And as demand grows, so do the tools. The result? A tangled mess of components, many of which depend heavily on the framework they’re built in. There is no fault to be found as it’s natural when a field moves fast, but it’s messy and unpractical.

You might think, “Well, that’s just how it goes,” but here’s the thing: frameworks have a life of their own. And if you've ever been stuck with a deprecated tool or spent weeks porting models between frameworks, you know how painful that can get.

(Here’s a quick reminder of how these trends have changed over time)

<!-- Google Trends embed remains here -->
<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/4031_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/g/11gd3905v1","geo":"","time":"2014-01-01 2025-04-29"},{"keyword":"/g/11bwp1s2k3","geo":"","time":"2014-01-01 2025-04-29"},{"keyword":"/m/0h95mh8","geo":"","time":"2014-01-01 2025-04-29"},{"keyword":"/g/11t6my1_gw","geo":"","time":"2014-01-01 2025-04-29"}],"category":0,"property":""}, {"exploreQuery":"date=2014-01-01%202025-04-29&q=%2Fg%2F11gd3905v1,%2Fg%2F11bwp1s2k3,%2Fm%2F0h95mh8,%2Fg%2F11t6my1_gw&hl=en-GB","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>

## The Ever-Shifting Framework Landscape

Frameworks aren’t static. Some evolve (like TensorFlow 2), others fade away (remember Theano?), and new ones (like JAX) pop up with killer features. Each has its own execution style, APIs, and toolchains; and that means a steep learning curve every time you switch.

This complexity is a real blocker. In fact, over 90% of companies plan to ramp up their AI investments, but only 1% think their AI capabilities are where they should be. One possible reason? Fragmentation at the foundation, in other words, right at the framework level.

Different teams want different things. Researchers love PyTorch for fast prototyping. JAX shines in large-scale parallel computing. TensorFlow dominates in production and mobile deployments. And if you’re trying to blend open-source models into production systems, it gets even trickier. You end up mixing and matching frameworks, and unfortunetly sometimes within the same product.

## Why This Hurts (More Than You Think)

When your tech stack is tied tightly to one framework, you run into problems:

* **Lock-in is real.** If a library loses support (like Theano) or shifts direction (like TensorFlow 1 to 2), your whole system might be at risk. Building on top of multi-backend tools gives you some insurance.

* **Best tool for the job? Not always easy.** Some frameworks do things better than others: physics simulations, distributed training, edge deployments. A rigid stack limits your options.

* **Reproducibility gets tricky.** Even porting models between major libraries (PyTorch to ONNX, TF to JAX) can be a pain. Things like random seeds, execution modes, tensor shapes, or custom gradients often break silently.

* **Deploying models is harder than it should be.**  AI models don’t live in one place. They train in the cloud, run on edge devices, serve millions in real-time. Framework-agnostic formats like ONNX or SavedModel make this easier—but only if you design for it.

## What’s the Fix? Framework-Agnostic & Multi-Framework Approaches

Instead of betting on a single framework, more teams are designing tools and workflows that work across multiple. That’s the move: *framework-agnostic development*. Here's what that looks like:

* **Use high-level libraries that support multiple backends.** Think: Keras 3.0. One model definition, works on TensorFlow, JAX, or PyTorch.
* **Model formats like ONNX.** Export once, run it wherever.
* **Testing frameworks that compare behavior across libraries.** Think: differential testing to catch subtle differences.
* **Interop-focused projects.** OpenXLA is a good example : it’s a shared compiler backend supported by Google that works across TF, JAX, and now PyTorch (via Torch XLA).

This shift is happening gradually. PyTorch and TensorFlow are even borrowing ideas from each other. TF2 got eager execution from PyTorch, and PyTorch 2.0 added `torch.compile` (similar to how XLA optimizes graphs in TF or JAX). These aren’t just nice features, they’re steps toward a shared ecosystem.

## Examples in the Wild

* [Keras 3.0](https://keras.io/keras_3/): Write code once, run on TF, JAX, or PyTorch.
* **ONNX Runtime**: Load and run models on anything from CPUs to mobile to cloud GPUs.
* **Hugging Face Diffusers**: Train or use generative models with either PyTorch or TensorFlow.
* **Flower**: A federated learning framework that abstracts backend differences.

<!-- Landscape embed view -->
But this few examples, are still lacking in comparizon with how big the deep learning ecosystem is becoming, as it can be seen on the snapshot of the open-sourced deep learning ecosystem [^3]. 
<iframe src="https://landscape.lfaidata.foundation/embed/embed.html?base-path=&classify=category&key=deep-learning&headers=true&category-header=true&category-in-subcategory=false&title-uppercase=false&title-alignment=left&title-font-family=sans-serif&title-font-size=13&style=shadowed&bg-color=%2319006d&fg-color=%23ffffff&item-modal=false&item-name=false&size=md&items-alignment=left" style="width:100%;height:600px;display:block;border:none;"></iframe>

*The snapshot has a big representation of what it is nowadays, but there are even more missing, as example go into one of the three main Frameworks, and look at their own high-level libraries[^4]*

## But… It’s Not Easy

As great as framework-agnostic sounds, making it work is tough.

* Different frameworks handle things like tensor ops, devices, or gradients in *very* different ways.
* PyTorch is dynamic, JAX is functional and stateless, and TF... well, depends on the version.

| Feature              | PyTorch                  | TensorFlow                    | JAX                           |
| -------------------- | ------------------------ | ----------------------------- | ----------------------------- |
| Default shape format | NCHW                     | NHWC                          | NHWC                          |
| Device placement     | Explicit (`.to(device)`) | Implicit (Graph or `.device`) | Functional (`jax.device_put`) |
| Requires gradient?   | `requires_grad=True`     | `tf.GradientTape()` context   | `jax.grad()` functional API   |
| Mutability           | Mutable tensors          | Sometimes mutable               | Immutable (`pure functions`)  |
| Randomness           | Global RNG               | Graph seed / local seed       | Explicit PRNGKey              |

* Writing one model that works across all three? Possible, but fragile, complex, and possible very restrictive.

<!-- Include this once in your base layout (if not already present) -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
<script>hljs.highlightAll();</script>

<!-- Three-column comparison layout -->
<div style="display: flex; gap: 16px; flex-wrap: wrap; justify-content: space-between; margin-top: 2rem;">

  <!-- PyTorch -->
  <div style="flex: 0.5; min-width: 100px;">
    <h5>PyTorch</h5>
    <pre><code class="language-python">
    import torch.nn as nn

    class TorchModel(nn.Module):
      def __init__(self):
          super().__init__()
          self.fc = nn.Linear(32, 10)

      def forward(self, x):
          return self.fc(x)
    </code></pre>
  </div>

  <!-- Tensorflow -->
  <div style="flex: 0.5; min-width: 100px;">
    <h5>Tensorflow</h5>
    <pre><code class="language-python">
    import tensorflow as tf
    from tf.keras.layers import Dense

    class Model(tf.keras.Model):
      def __init__(self):
        self.fc = Dense(32, 10)

      def __call__(self, x):
        return self.fc(x)
    </code></pre>
  </div>

  <!-- JAX -->
  <div style="flex: 0.5; min-width: 100px;">
    <h5>JAX (Flax)</h5>
    <pre><code class="language-python">
    from flax import nnx

    class Model(nnx.Module):
      def __init__(self, rngs):
        self.fc = nnx.Linear(
          32, 10, rngs=rngs)

      def __call__(self, x):
        return self.fc(x)
    </code></pre>
</div>

</div>

Teams may decide that they are going to support a multi-framework codebase. But now you’re maintaining N versions of the same functionality; that's simultaneous development, testing and deployment needed for N codes. That’s a recipe for bugs. Automated testing and good abstractions are a must here, and that still requires more effort.

Luckily, tool support is growing[^5]. There’s active research into model verification, bug detection, and better conversion tools. As the community embraces this direction, the ecosystem becomes more robust.

## Where We're Headed

The ideal? A world where ML engineers can *write once, run anywhere* — whether that’s on a cloud GPU, an iPhone, or an embedded chip in a robot. We're not fully there yet, but between open compilers (like OpenXLA), standardized formats (like ONNX), and high-level libraries (like Keras 3), we’re getting closer, and as of now hoping for smooth plug-and-play integration regardless of you initial framework selection is a coming step.

If your team is building anything meant to last more than a couple of years, thinking about framework-agnostic design early on can save you a lot of pain later. But instead of doing it by yourself, leave this for the open-source frameworks out there (and contribute if you feel so). This way, you avoid the problems we talked about before with keeping track of N versions, while we ensure the maintainability in the future thanks to the rich open-source ecosystem.

Let’s build for the long term — even if the frameworks keep changing under our feet.

And if this catches your eye, stay tuned for what we'll be releasing in the Cognitive Labs!

---

[^1]: The well known landscape of dependencies for a ML System, [Hidden Technical Debt in Machine Learning Systems](https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html), is futher expanded with other papers such as [A Taxonomy of Self-Admitted Technical Debt in Deep Learning Systems](https://arxiv.org/pdf/2409.11826) which found that i) there is a significant number of technical debt in all the studied deep learning frameworks. ii) there is design debt, defect debt, documentation debt, test debt, requirement debt, compatibility debt, and algorithm debt in deep learning frameworks. iii) the majority of the technical debt in deep learning framework is design debt (24.07% - 65.27%), followed by requirement debt (7.09% - 31.48%) and algorithm debt (5.62% - 20.67%). In some projects, compatibility debt accounts for more than 10%.
[^2]: According to [Mckinsey global survey][1] on the corporation view of AI, deep learning and artificial intelligence are integrated into at least one business function by 78% of respondents.

[^3]: As noted by McKinsey’s[Open Source in the Age of AI (2023)][2], around 92% of companies reported that they use open-source software in at least one of their AI initiatives. The survey also highlights that open-source components are increasingly critical not just for research prototyping, but also for production deployments in enterprise settings. The landscap of only deep learning open sourced by Linux Foundation, [Open-Source Ecosystem for Machine Learning by the Linux Foundation](https://lfai.landscape2.io/), but out there exists many more if you go to other libraries layers such as in backends / data / security / ethics / model / deployment ... managers.

[^4]: Examples include: i) The ecosystem built over PyTorch: PyTorch Geometric, TorchText, TorchAudio, and third-party libraries like Pyro and Stable Baselines 3 (SB3). ii) The TensorFlow ecosystem: APIs like TensorFlow Lite, TFX, TensorFlow.js, and extensions such as TensorFlow Probability, TensorFlow GNN, and TensorFlow Quantum (plus projects like Sonnet). iii) Other frameworks: Stable Baselines (SB3) is building SBX for reinforcement learning with JAX or [Google DeepMind's libraries][2] including dm-haiku (neural networks), MCTX (Monte Carlo tree search), Jraph (graph neural networks), and physics simulators like JAX MD.

[^5]: One recent paper on DL testing [Deep Learning Library Testing: Definition, Methods, and Challenges][3] Survey with 93 papers collected from the literature, where 69 are related to DL framework testing, 12 to DL compiler testing and 13 to DL hardware library testing. There exists a recent trend with more papers on this topic.


[1]:https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai 'Mckinsey: Global Survey on the State of AI, 2025'
[2]:https://deepmind.google/discover/blog/using-jax-to-accelerate-our-research/
[3]:https://dl.acm.org/doi/10.1145/3716497
