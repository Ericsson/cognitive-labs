---
title: Team
nav:
  order: 3
  tooltip: About our team
---

# {% include icon.html icon="fa-solid fa-users" %} Team

On this page we list the members of the Cognitive Labs. You can click in each one of them to be able to see in what they are working on right now and check the profile. We are so lucky to have this amazing team!


## Our Leaders

These are our leaders, setting up the strategy of our organization, in long-term AI Research and in the AI Prototypes we develop (short-time AI Research).

{% include section.html %}

{% include list.html data="members" component="portrait" filter='lab.include?("leaders")' %}

{% capture content %}

{% endcapture %}

## Core Team

Here we list the Core Team of the Cognitive Labs. These are the members who are helping organize our open-source initiatives and the key-contributors to our open-source projects.

{% include section.html %}

{% include list.html data="members" component="portrait" filter='lab.include?("core")' %}

{% capture content %}

{% endcapture %}

## Machine Learning

These members are the ones with a background in Machine Learning more focused on the AI Research and how to apply it to our prototypes.

{% include section.html %}

{% include list.html data="members" component="portrait" filter='lab.include?("ml")' %}

{% capture content %}

{% endcapture %}

## RAN Optimization

These are the members with a background in telecommunications, focused on Radio Access Network (RAN) optimization. 

{% include section.html %}

{% include list.html data="members" component="portrait" filter='lab.include?("ran")' %}

{% capture content %}

{% endcapture %}