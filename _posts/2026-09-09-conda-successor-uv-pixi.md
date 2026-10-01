---
title: "conda's Long Goodbye: Why We Think uv and Pixi Win"
author: oscar-llorente-gonzalez, lucia-ferrer, dani-bazo
tags:
  - engineering
abstract: An opinion piece. conda solved a real problem that pip never did, but its differentiators are fading, most projects now ship as wheels, and the licensing is a liability. We think uv covers the common case and Pixi inherits what's left.
---

In a [companion post][evolution-post] we traced how Python's PyPI tooling went from `pip` to `Poetry` to `uv`, and argued that uv finally pulled that lineage together. That story left out the other half of the packaging world on purpose. conda was never a step in the pip lineage. It was a separate universe with its own repositories, its own solver, and a genuinely different reason to exist.

This post is about that universe, and it is an opinion piece. We think conda's rationale is collapsing. uv already covers most of what people used conda for, and where it doesn't, we think Pixi inherits the job rather than classic conda.

## What conda was actually for

conda predates Poetry. It shipped in 2012, four years after pip, from Anaconda (then Continuum Analytics)[^18]. The important thing is that it solved a different problem.

pip installs Python packages from PyPI. conda installs Python too, but it also installs C libraries, compilers, CUDA toolkits, R, and system-level dependencies from its own repositories, first `defaults` and later the community-run `conda-forge`. `pip install numpy` grabs a Python wheel and trusts that the system libraries underneath it already exist. `conda install numpy` can pull the whole binary stack, down to the compiled math libraries that numpy links against.

That capability made conda the default in scientific computing and machine learning for a decade. If your project needed a specific CUDA version or a Fortran-compiled library, conda handled it and pip couldn't. The standard advice was blunt: data science meant Anaconda, web development meant pip. The community was split into two camps that barely shared a vocabulary.

So this is not a post about conda being bad. It solved a real problem. The ground underneath it has simply shifted.

## We have lived the conda nightmare

We are not writing this from the outside. Between us we have spent years in conda, miniconda, and miniforge, and honestly we still could not cleanly explain the difference between all of them to you. Every deep-learning project came with its own environment, and half the battle was remembering which environment belonged to which project, where it lived on disk, and what it had been called. Reproducing an old result often meant archaeology before it meant code.

Then we moved projects to uv, and most of them just worked on PyPI wheels. Even the awkward corners held up: geospatial work, where the notoriously fiddly PROJ library shows up as `pyproj`, installed without a conda channel in sight.

We will not pretend the transition was total, though, and that honesty is the whole point of the next section.

## The binaries moved to PyPI

The main reason anyone reached for conda was non-Python binaries, and GPU stacks above all. That reason has mostly evaporated.

The wheels for `torch`, `tensorflow`, `jax`, and `cupy` now bundle their CUDA runtime inside the wheel. `pip install torch` or `uv add torch` pulls the GPU build straight from PyPI. If you import the framework and run on a GPU, you never install CUDA as a separate step, and you never needed conda to do it. The NVIDIA kernel driver was never conda's responsibility anyway; that came from the OS. So for the bulk of ML work, training and serving models on GPUs with mainstream frameworks, uv is enough and conda adds nothing.

There is still a real deficit, and it comes down to how the two ecosystems handle CUDA. On PyPI, each GPU wheel bundles its own copy of the CUDA libraries. That makes downloads large and lets GPU packages conflict with each other when their bundled versions disagree. On conda-forge it works the other way: PyTorch, cuDNN, and friends share a single `cuda-toolkit` package instead of each shipping their own, which keeps environments smaller and keeps CUDA-dependent libraries on the same version. We have felt the PyPI side of this directly, watching environments balloon and CUDA wheels demand a manually configured index before they would install at all. Add the genuinely native cases on top, compiling custom kernels from `.cu` source, or libraries like FFmpeg and GDAL that aren't always on PyPI, and you have a class of heavy, multi-language projects that a pure PyPI workflow still doesn't serve cleanly. It is a niche. It is also exactly where we think a new tool has room to win.

## The license problem

conda's other historical advantage turned into its biggest liability.

The `defaults` channel and the Anaconda distribution moved to a commercial license for larger organizations. In 2024 Anaconda began enforcing its terms of service on `defaults`, and a lot of companies discovered mid-flight that their "free" tooling now carried a bill and a compliance question, forcing scrambles onto `conda-forge`[^20] or off conda entirely. Once your safest default tool is something legal has to review, the appeal drains fast. "Use PyPI wheels with uv" isn't only faster. It removes a contract from the conversation.

## We have seen this movie before

Here is the part that convinces us most, because the pip side already ran the same experiment.

conda's classic SAT-based solver was slow. A single `conda install` could take minutes or look like it had hung entirely. The problem was bad enough that someone wrote a faster drop-in solver in C++, `mamba`[^19], and conda eventually adopted its `libmamba` solver as the default in 2023. That is the pip-to-uv arc in miniature: a community tolerates slow tooling for years, then a faster reimplementation resets everyone's expectations.

The thread runs further. mamba's original author, Wolf Vollprecht, later co-founded prefix.dev, which built a Rust stack called `rattler` that reimplements the conda ecosystem, and on top of it, **Pixi**[^22]. The two projects live at different organizations, QuantStack and prefix.dev, so this is overlapping people and ideas rather than one shared team. But the instinct that produced mamba, make conda fast, is the same instinct now producing a full package manager.

## The alternative: Pixi

If uv won the PyPI world, we think Pixi is the natural candidate for whatever still genuinely needs conda-forge.

Pixi is a Rust-based package manager built on the same `rattler` stack, and it makes the same bet uv made on speed. It targets the conda-forge ecosystem, so it keeps conda's real strengths, the non-Python binaries and the system-library reach, inside a fast, lockfile-driven, `pyproject.toml`-friendly workflow. Because it lives on conda-forge rather than Anaconda's `defaults`, the licensing cloud goes away. And it inherits the shared-runtime behavior we described earlier: the CUDA bloat and version conflicts you get from self-contained PyPI wheels are exactly the thing conda-forge's single shared `cuda-toolkit` avoids. For the heavy, multi-language projects that a pure PyPI workflow leaves half-served, that is the whole ballgame.

The honest caveat is maturity. Pixi is still pre-1.0, so its behavior can shift, and it has none of conda's decade of institutional trust yet. We are describing momentum, not a finished migration.

## Our prediction

This is a prediction, not a verdict. People who live in scientific computing will push back, and conda is not disappearing next quarter.

That said, here is where we think Python packaging is going. uv becomes the default for the PyPI world, which is most projects now that the binaries ride along in wheels. Pixi, or something shaped like it, takes the conda-forge remainder: the native-compile and multi-language work that a pure PyPI workflow still can't serve well. Classic conda and the Anaconda distribution slide from default choice to legacy, pushed there by fading differentiators, licensing friction, and the same speed-and-usability pull that made uv feel inevitable.

The last decade has a clear lesson. The Python community drops friction it had learned to live with the instant something faster shows the friction was optional. We think conda is next.

---

## References

[^18]: conda documentation — https://docs.conda.io/. conda is a cross-platform, language-agnostic package and environment manager. Unlike pip, it installs prebuilt binaries (including non-Python ones) from its own channels rather than Python wheels from PyPI, which is what historically made it the default for scientific and GPU-heavy stacks.
[^19]: mamba — a fast, C++ reimplementation of the conda package manager — https://mamba.readthedocs.io/ mamba was created in 2019 by Wolf Vollprecht at QuantStack. He later co-founded prefix.dev, which built the Rust `rattler` stack and, on top of it, Pixi (2023). So there is a real technical and founder lineage from mamba to Pixi, though the two are maintained by different organizations (QuantStack vs prefix.dev) with overlapping people and ideas rather than a shared maintainer team.
[^20]: conda-forge — a community-led collection of recipes and packages for conda — https://conda-forge.org/. It is the community-governed channel (as opposed to Anaconda's commercial `defaults` channel), which is why migrations away from licensing exposure typically land here. It's also the package base that Pixi builds on.
[^22]: Pixi — a fast, Rust-based package manager built on the conda-forge ecosystem — https://pixi.sh/

[evolution-post]: https://ericsson.github.io/cognitive-labs/2026/01/01/uv-blog.html
