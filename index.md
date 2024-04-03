---
---

<h1 style="text-align: center;">Ready to create the future?</h1>

This is the official web page of Ericsson Cognitive Labs. This is an initiative to contribute to the rest of society by making a huge amount of our research public. Our mission is to create world-class AI research that can improve our products and benefit the open-source community at the same time. Our interests are centered on cutting-edge AI technologies, such as Graph Neural Networks, Reinforcement Learning, Active Learning or Large Language Models.

<iframe width="80%" height="400"
src="https://www.youtube.com/embed/Kbo8DAARD8s">
</iframe>

<h1 style="text-align: center;">Who are we?</h1>

Ericsson Cognitive Labs is an initiative powered by a department inside [Cognitive Network Solutions](https://www.ericsson.com/en/portfolio/cloud-software-and-services/cognitive-network-solutions) (which is within the Business Area Cloud Software and Services - BCSS), called Cognitive Software Engineering. In this department, we are focused on the optimization of cellular networks using AI. If you are interested in our products please check this [web page](https://www.ericsson.com/en/portfolio/cloud-software-and-services/cognitive-network--solutions/cognitive-software), and if what drives you here is our publications, check our publications page or our Labs and the initiatives they are pursuing.


## Highlights

{% capture text %}

We firmly believe in open-source and contributing to the community and the world, check our latest publications in cutting-edge AI technologies such as Graph Neural Networks or Active Learning.

{%
  include button.html
  link="research"
  text="See our publications"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/light.jpg"
  link="research"
  title="Our Research"
  text=text
%}

{% capture text %}

As a commitment to the Open-Source community, we have created three different Labs to continue our research activity and develop open-source libraries and components that can be reused by anyone.

{%
  include button.html
  link="projects"
  text="Browse our Labs"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/night.jpg"
  link="projects"
  title="Our Labs"
  flip=true
  style="bare"
  text=text
%}

{% capture text %}

We have a world-class team of Data Scientists and Engineers working together to develop the latest technologies, check out their amazing stories!

{%
  include button.html
  link="team"
  text="Meet our team"
  icon="fa-solid fa-arrow-right"
  flip=true
  style="bare"
%}

{% endcapture %}

{%
  include feature.html
  image="images/team.png"
  link="team"
  title="Our Team"
  text=text
%}
