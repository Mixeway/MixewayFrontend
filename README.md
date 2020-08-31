<a href="Mixeway/MixewayFrontend/blob/master/CHANGELOG.md"><img src="https://camo.githubusercontent.com/452f81a1e660cf8f9a47db9405ce06a0f216221b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d6368616e67656c6f672d626c75652e737667" alt="https://img.shields.io/badge/-changelog-blue.svg" data-canonical-src="https://img.shields.io/badge/-changelog-blue.svg" style="max-width:100%;"></a>
[![Build Status](https://travis-ci.org/Mixeway/MixewayFrontend.svg?branch=master)](https://travis-ci.org/Mixeway/MixewayFrontend)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Mixeway_MixewayFrontend&metric=alert_status)](https://sonarcloud.io/dashboard?id=Mixeway_MixewayFrontend)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Mixeway_MixewayFrontend&metric=security_rating)](https://sonarcloud.io/dashboard?id=Mixeway_MixewayFrontend)

# Mixeway User Interface <img src="https://mixeway.github.io/img/logo_dashboard.png" height="60px">

### About Mixeway:
Mixeway is an OpenSource software that is meant to simplify the process of security assurance of projects which are implemented using CICD procedures. **Mixawey is not another vulnerability scanning
software - it is security orchestration tool**.
Mixeway frontend is based on ngx-admin dashboard - https://github.com/akveo/ngx-admin

With number of plugins for Vulnerability Scanners :
<img src="https://mixeway.github.io/img/nessus.png" height="50px">
<img src="https://mixeway.github.io/img/openvas.jpg" height="50px">
<img src="https://mixeway.github.io/img/acunetix.jpg" height="50px">
<img src="https://mixeway.github.io/img/fortify.jpg" height="50px">
<img src="https://mixeway.github.io/img/depcheck.png" height="50px">
<img src="https://mixeway.github.io/img/cis.png" height="50px">
<img src="https://mixeway.github.io/img/jenkins.jpg" height="50px">
<img src="https://mixeway.github.io/img/jira.jpg" height="50px">

With all this available, Mixeway provides functionalities to:
- Automatic service discovery (IaaS Plugin for assets and network scans for services)
- Automatic Vulnerability Scan Configuration (Based on most recent configuration) - hands-free!
- Automatic and on-demand Vulnerability scan execution (based on policy and executed via a REST API call)
- One Vulnerability Database for all type of sources - SAST, DAST, OpenSource and Infrastructure vulnerabilities in one place
- Customizable Security Quality Gateway - a reliable piece of information for CICD to decide if a job should pass or not.
- REST API enables integration with already used Vulnerability Management systems used within the organization.

Elements of a system:
- <a href="https://github.com/Mixeway/MixewayBackend">Backend - Spring Boot REST API</a>
- <a href="https://github.com/Mixeway/MixewayFrontend">Frontend - Angular 8 application </a>
- <a href="https://hub.docker.com/repository/docker/mixeway/db">DB - postgres database</a>
- <a href="https://hub.docker.com/repository/docker/mixeway/vault">Vault - password store</a>
- <a href="https://github.com/Mixeway/MixewayHub">MixewayHub - parent project which contain docker-compose and one click instalation </a>

###### Mixeway User Interface Description:
Mixeway User Interface is simple Angular 8 application based on <a href="https://github.com/akveo/ngx-admin">Ngx-admin template</a>.
High level description can be found at <a href="https://mixeway.io">mixeway.io</a>


###### Mixeway User Interface Tech stack:
<img src="https://akveo.github.io/nebular/assets/img/akveo-logo.png" width="50px">
<img src="https://mixeway.github.io/img/angular-icon.svg" width="50px">
<img src="https://mixeway.github.io/img/docker.png" width="50px">

###### Requirements:
- Running and working backend API - <a href="https:/github.com/Mixeway/MixewayBackend">Mixeway REST API</a>
- NPM 6.9+
- Optionaly: ssl certificates
- Proxy setup

###### Running in development mode:
`ng serve "--proxy-config=proxy.conf.json" "--configuration=dev" "--ssl" "--ssl-cert=/etc/pki/cert.pem" "--ssl-key=/etc/pki/key2.pem"
`
