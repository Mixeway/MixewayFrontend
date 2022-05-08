## 1.6.1 (2022-05-07)

#### Bug Fixes
* Fixed bug related with improper view of the status in codeproject opensource scanner integration (https://github.com/Mixeway/MixewayFrontend/issues/57)
* Fixed bug related with not opened vulnerability details

<a name="1.3.0"></a>
## 1.3.0 (2020-05-31)

#### New Features

* Mixeway Vuln Auditor - DeepLearning microservice which use Neural Network to classify software vulnerabilities
* Vulnerability Description is displayed in more proper manner. Modal displaying details is allowing user to confirm or
deny vulnerability
* Possibility to create Application profile, on both project or asset level information gathered and put into profile
helps Vuln Auditor to better understand application context and then classify vulnerability

#### Bug Fixes
* Tables filtering set to proper level. Whenever possible select fields are possible to show.
* Vulnerabilities are no longer deleted before loading from scanner. ID of detected vulnerability is constant, vulnerability is deleted
only if it is not detected in next scan.

#### Removed Features
* Partitioning software vulnerabilities was removed, in this place single tab is displayed with colum which allows to filter


<a name="1.1.0"></a>
## 1.1.0 (2020-03-20)

### Info

* Widget for CI Jobs in project preview
* Fixed problems with saving Code Projects and creating integrations with SAST and OpenSource Scanners

<a name="1.0.1"></a>
## 1.0.1 (2020-03-11)

### Info

* Project Configure for SourceCode now contain edit button which allow to change default branch


<a name="0.9.2"></a>
## 0.9.1 (2020-02-08)

### Info

* Fixed bug related with deletion of scanners
* REST API to get scanner types already integrated
* Checkmarx integration (scope: create project, configure scan, run sca, get vulnerabilities)
* Extended Fortify SSC integration - possibility to create and configure SSC projects via Mixeway

<a name="0.9"></a>
## 0.9 (2019-12-07)

### Info

* Initial release
