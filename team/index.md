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

{% include list.html data="members" component="portrait" filter='lab.include?("leaders")' %}

{% capture content %}

{% endcapture %}

## Maintainers

{% include section.html %}

{% include list.html data="members" component="portrait" filter='lab.include?("maintainer")' %}

{% capture content %}

{% endcapture %}

## All Members

{% include section.html %}

{% include list.html data="members" component="portrait" %}

{% capture content %}

<!-- {% include figure.html image="images/photo.jpg" %}
{% include figure.html image="images/photo.jpg" %}
{% include figure.html image="images/photo.jpg" %} -->

{% endcapture %}

{% include grid.html style="square" content=content %}
