---
title: Framework-Agnostic Libraries are needed
author: lucia-ferrer
tags:
  - Software
excerpt: The explosion of deep learning has made AI software more than a research endeavor. It's now a business-critical asset. As AI goes from prototype to product, the underlying infrastructure grows with it. The tools? Diverse. The choices? Fragmented. The frameworks? A bit of a mess. And that mess? It’s increasingly a blocker.
---

Deep learning has grown fast, *really fast*. It's now a major part of how companies make decisions and design products. With this boom, AI has become more powerful, but also way more complex. One big challenge? The explosion of tools and frameworks. We're now living in a world full of TensorFlow, PyTorch, JAX, MXNet, and more, each with its own quirks and tradeoffs.

For machine learning engineers, it’s like walking through a forest where every path leads to a different framework, and no one’s really sure which one will still exist in five years.

## So, what’s the issue?

These days, building AI-powered products isn’t optional — it’s expected. And as demand grows, so do the tools. The result? A tangled mess of components, many of which depend heavily on the framework they’re built in. There is no fault to be foun as it’s natural when a field moves fast, but it’s messy and unpractical.

You might think, “Well, that’s just how it goes,” but here’s the thing: frameworks have a life of their own. And if you've ever been stuck with a deprecated tool or spent weeks porting models between frameworks, you know how painful that can get.

(Here’s a quick reminder of how these trends have changed over time)

<!-- Google Trends embed remains here -->
<script type="text/javascript" src="https://ssl.gstatic.com/trends_nrtr/4031_RC01/embed_loader.js"></script> <script type="text/javascript"> trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"/g/11gd3905v1","geo":"","time":"2014-01-01 2025-04-29"},{"keyword":"/g/11bwp1s2k3","geo":"","time":"2014-01-01 2025-04-29"},{"keyword":"/m/0h95mh8","geo":"","time":"2014-01-01 2025-04-29"},{"keyword":"/g/11t6my1_gw","geo":"","time":"2014-01-01 2025-04-29"}],"category":0,"property":""}, {"exploreQuery":"date=2014-01-01%202025-04-29&q=%2Fg%2F11gd3905v1,%2Fg%2F11bwp1s2k3,%2Fm%2F0h95mh8,%2Fg%2F11t6my1_gw&hl=en-GB","guestPath":"https://trends.google.com:443/trends/embed/"}); </script>

## The Ever-Shifting Framework Landscape

Frameworks aren’t static. Some evolve (like TensorFlow 2), others fade away (remember Theano?), and new ones (like JAX) pop up with killer features. Each has its own execution style, APIs, and toolchains — and that means a steep learning curve every time you switch.

This complexity is a real blocker. In fact, over 90% of companies plan to ramp up their AI investments, but only 1% think their AI capabilities are where they should be. One major reason? Fragmentation at the foundation — right at the framework level.

Different teams want different things. Researchers love PyTorch for fast prototyping. JAX shines in large-scale parallel computing. TensorFlow dominates in production and mobile deployments. And if you’re trying to blend open-source models into production systems, it gets even trickier. You end up mixing and matching frameworks — sometimes within the same product.

## Why This Hurts (More Than You Think)

When your tech stack is tied tightly to one framework, you run into problems:

* **Lock-in is real.** If a library loses support (like Theano) or shifts direction (like TensorFlow 1 to 2), your whole system might be at risk. Building on top of multi-backend tools gives you some insurance.

* **Best tool for the job? Not always easy.** Some frameworks do things better than others — physics simulations, distributed training, edge deployments. A rigid stack limits your options.

* **Reproducibility gets tricky.** Even porting models between major libraries — PyTorch to ONNX, TF to JAX — can be a pain. Things like random seeds, execution modes, tensor shapes, or custom gradients often break silently.

* **Deploying models is harder than it should be.** AI models don’t live in one place. They train in the cloud, run on edge devices, serve millions in real-time. Framework-agnostic formats like ONNX or SavedModel make this easier — but only if you design for it.

## What’s the Fix? Framework-Agnostic & Multi-Framework Approaches

Instead of betting on a single framework, more teams are designing tools and workflows that work across multiple. That’s the move: *framework-agnostic development*. Here's what that looks like:

* **Use high-level libraries that support multiple backends.** Think: Keras 3.0 — one model definition, works on TensorFlow, JAX, or PyTorch.
* **Model formats like ONNX.** Export once, run it wherever.
* **Testing frameworks that compare behavior across libraries.** Think: differential testing to catch subtle differences.
* **Interop-focused projects.** OpenXLA is a good example — it’s a shared compiler backend supported by Google that works across TF, JAX, and now PyTorch (via Torch XLA).

This shift is happening gradually. PyTorch and TensorFlow are even borrowing ideas from each other. TF2 got eager execution from PyTorch, and PyTorch 2.0 added `torch.compile` — similar to how XLA optimizes graphs in TF or JAX. These aren’t just nice features — they’re steps toward a shared ecosystem.

## Examples in the Wild

* [Keras 3.0](https://keras.io/keras_3/): Write code once, run on TF, JAX, or PyTorch.
* **ONNX Runtime**: Load and run models on anything from CPUs to mobile to cloud GPUs.
* **Hugging Face Diffusers**: Train or use generative models with either PyTorch or TensorFlow.
* **Flower**: A federated learning framework that abstracts backend differences.

<!-- Landscape embed view -->
<iframe src="https://landscape.lfaidata.foundation/embed/embed.html?base-path=&classify=category&key=deep-learning&headers=true&category-header=true&category-in-subcategory=false&title-uppercase=false&title-alignment=left&title-font-family=sans-serif&title-font-size=13&style=shadowed&bg-color=%2319006d&fg-color=%23ffffff&item-modal=false&item-name=false&size=md&items-alignment=left" style="width:100%;height:600px;display:block;border:none;"></iframe>

*Snapshot of the growing deep learning ecosystem*

## But… It’s Not Easy

As great as framework-agnostic sounds, making it work is tough.

* Different frameworks handle things like tensor ops, devices, or gradients in *very* different ways.
* PyTorch is dynamic, JAX is functional and stateless, and TF... well, depends on the version.

| Feature              | PyTorch                  | TensorFlow                    | JAX                           |
| -------------------- | ------------------------ | ----------------------------- | ----------------------------- |
| Default shape format | NCHW                     | NHWC                          | NHWC                          |
| Device placement     | Explicit (`.to(device)`) | Implicit (Graph or `.device`) | Functional (`jax.device_put`) |
| Requires gradient?   | `requires_grad=True`     | `tf.GradientTape()` context   | `jax.grad()` functional API   |
| Mutability           | Mutable tensors          | Usually mutable               | Immutable (`pure functions`)  |
| Randomness           | Global RNG               | Graph seed / local seed       | Explicit PRNGKey              |


* Writing one model that works across all three? Possible, but fragile.

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

  <!-- JAX -->
  <div style="flex: 0.5; min-width: 100px;">
    <h5>JAX (Flax)</h5>
    <pre><code class="language-python">
import flax.linen as nn

class JAXModel(nn.Module):
    @nn.compact
    def __call__(self, x):
        return nn.Dense(10)(x)
    </code></pre>
  </div>

  <!-- Agnostic -->
  <div style="flex: 0.5; min-width: 100px;">
    <h5>Framework-Agnostic</h5>
    <pre><code class="language-python">
def linear(x, w, b):
    return x @ w + b
    </code></pre>
  </div>

</div>



So, multi-backend support is often the compromise. You write backend-specific code, sometimes in parallel — but now you’re maintaining N versions of the same functionality. That’s a recipe for bugs. Automated testing and good abstractions are a must here.

Luckily, tool support is growing. There’s active research into model verification, bug detection, and better conversion tools. As the community embraces this direction, the ecosystem becomes more robust.

## Where We're Headed

The ideal? A world where ML engineers can *write once, run anywhere* — whether that’s on a cloud GPU, an iPhone, or an embedded chip in a robot. We're not fully there yet, but between open compilers (like OpenXLA), standardized formats (like ONNX), and high-level libraries (like Keras 3), we’re getting closer.

If your team is building anything meant to last more than a couple years, thinking about framework-agnostic design early on can save you a lot of pain later.

---

Let’s build for the long term — even if the frameworks keep changing under our feet.

