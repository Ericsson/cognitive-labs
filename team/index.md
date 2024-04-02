---
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %} Team

On this page we list the members of our amazing research team, listing the members of each one of the labs. Click on their profile to see how lucky we are to have them!


## Our Leaders

{% include section.html %}

{% include list.html data="members" component="portrait" filters="lab: leaders" %}

{% capture content %}

{% endcapture %}

## Data Science Board

{% include section.html %}

{% include list.html data="members" component="portrait" filters="lab: board" %}

{% capture content %}

{% endcapture %}

## Geometric Artificial Intelligence (GAI) Lab

{% include section.html %}

{% include list.html data="members" component="portrait" filters="lab: gai-lab" %}

{% capture content %}

{% endcapture %}

## Machine Learning & Reasoning (MLR) Lab

{% include section.html %}

{% include list.html data="members" component="portrait" filters="lab: mlr-lab" %}

{% capture content %}

{% endcapture %}

## Foundational Artificial Intelligence (FAI) Lab

{% include section.html %}

{% include list.html data="members" component="portrait" filters="lab: fai-lab" %}

{% capture content %}


<!-- {% include figure.html image="images/photo.jpg" %}
{% include figure.html image="images/photo.jpg" %}
{% include figure.html image="images/photo.jpg" %} -->

{% endcapture %}

{% include grid.html style="square" content=content %}
