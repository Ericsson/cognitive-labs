---
title: Contact
nav:
  order: 5
  tooltip: Email, address, and location
---

# {% include icon.html icon="fa-regular fa-envelope" %} Contact

On this page, we list several ways of contacting our team, through email, phone or physically at the office. Moreover, here we list the people from our team in charge of this page:

{%
  include button.html
  type="email"
  text="Email"
  link="oscar.llorente.gonzalez@ericsson.com"
%}
{%
  include button.html
  type="phone"
  text="Phone"
  link="+34 913 39 10 00"
%}
{%
  include button.html
  type="address"
  tooltip="Our location on Google Maps for easy navigation"
  link="https://www.google.com/maps/dir/40.4470375,-3.6984331/ericsson+españa/@40.419992,-3.7199383,13z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0xd422096bfaac9b7:0xab7c160e9c581434!2m2!1d-3.6745359!2d40.3947612?entry=ttu"
%}

{% include section.html %}

{% include list.html data="members" component="portrait" filters="name: Oscar Llorente Gonzalez" %}

{% include list.html data="members" component="portrait" filters="name: Raul Martin" %}
