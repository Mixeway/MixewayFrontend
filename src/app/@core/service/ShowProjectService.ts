import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, timeout} from 'rxjs/operators';
import {Risk} from '../Model/Risk';
import {IaasApi} from '../Model/IaasApi';
import {Assets} from '../Model/Asset';
import {RoutingDomain} from '../Model/RoutingDomain';
import {Proxies} from '../Model/Proxies';
import {DTrackProject} from '../Model/DTrackProject';
import {WebApps} from '../Model/WebApps';
import {CodeGroup, Codes} from '../Model/Codes';
import {VulnTrendChart} from '../Model/VulnTrendChart';
import {InfraVuln} from '../Model/InfraVuln';
import {WebAppVuln} from '../Model/WebAppVuln';
import {CodeVuln} from '../Model/CodeVuln';
import {AuditVuln} from '../Model/AuditVuln';
import {Severities} from '../Model/Severities';
import {ApiKey} from '../Model/ApiKey';
import {SoftVuln} from '../Model/SoftVuln';
import {SastProject} from '../Model/SastProject';
import {ScannerType} from '../Model/Scanner';
import {CiOperations} from '../Model/CiOperations';
import {Vulnerability} from '../Model/Vulnerability';

@Injectable({
  providedIn: 'root',
})
export class ShowProjectService {
  showProjectPath: string = '/show/project';
  constructor(private http: HttpClient) { }
  getRiskCards(id): Observable<Risk> {
    return this.http.get<Risk>(environment.backend + this.showProjectPath + '/' + id + '/risk')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getIaasApi(id): Observable<IaasApi> {
    return this.http.get<IaasApi>(environment.backend + this.showProjectPath + '/' + id + '/iaasapi')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getVulnerabilities(id): Observable<Vulnerability[]> {
    return this.http.get<Vulnerability[]>(environment.backend + this.showProjectPath + '/' + id + '/vulnerabilities')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getVulnerability(id, vulnId): Observable<Vulnerability> {
    return this.http.get<Vulnerability>(environment.backend + this.showProjectPath + '/' + id +
      '/vulnerabilities/' + vulnId)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getAssets(id): Observable<Assets> {
    return this.http.get<Assets>(environment.backend + this.showProjectPath + '/' + id + '/assets')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getRoutingDomains(): Observable<RoutingDomain[]> {
    return this.http.get<RoutingDomain[]>(environment.backend + '/show/project/routingdomains')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getProxies(): Observable<Proxies[]> {
    return this.http.get<Proxies[]>(environment.backend + '/show/project/proxies')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getWebApps(id): Observable<WebApps> {
    return this.http.get<WebApps>(environment.backend + this.showProjectPath + '/' + id + '/webapps')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getCodes(id): Observable<Codes> {
    return this.http.get<Codes>(environment.backend + this.showProjectPath + '/' + id + '/codes')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getCodeGroups(id): Observable<CodeGroup[]> {
    return this.http.get<CodeGroup[]>(environment.backend + this.showProjectPath + '/' + id + '/codegroups')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getVulnTrendChart(id): Observable<VulnTrendChart> {
    return this.http.get<VulnTrendChart>(environment.backend + this.showProjectPath + '/' + id +
      '/vulns/vulntrendchart')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getDTrackProjects(): Observable<DTrackProject[]> {
    return this.http.get<DTrackProject[]>(environment.backend + this.showProjectPath + '/dtrackprojects')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getSeverityChart(id): Observable<Severities> {
    return this.http.get<Severities>(environment.backend + this.showProjectPath + '/' + id + '/vulns/severitychart')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getInfraVulns(id): Observable<InfraVuln[]> {
    return this.http.get<InfraVuln[]>(environment.backend + this.showProjectPath + '/' + id + '/vulns/infra')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getSoftVulns(id): Observable<SoftVuln[]> {
    return this.http.get<SoftVuln[]>(environment.backend + this.showProjectPath + '/' + id + '/vulns/soft')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getWebAppVulns(id): Observable<WebAppVuln[]> {
    return this.http.get<WebAppVuln[]>(environment.backend + this.showProjectPath + '/' + id + '/vulns/webapp')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getCodeVulns(id): Observable<CodeVuln[]> {
    return this.http.get<CodeVuln[]>(environment.backend + this.showProjectPath + '/' + id + '/vulns/code')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getAuditVulns(id): Observable<AuditVuln[]> {
    return this.http.get<AuditVuln[]>(environment.backend + this.showProjectPath + '/' + id + '/vulns/audit')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  errorHandl(error) {
    if (error.status === 403) {
      const expires = 'expires=' + new Date().toUTCString();
      document.cookie = `role=;Path=/;expires=${expires}`;
      window.location.reload();
    }
    return throwError(error.status);
  }
  putIaasForProject(id, body): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/add/iaasapi', body)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  testIaasApi(id): Observable<string> {
    return this.http.get<string>(environment.backend + this.showProjectPath + '/' + id + '/iaasapi/test')
      .pipe(
        retry(0),
        timeout(3000),
        catchError(this.errorHandl),
      );
  }
  enableIaasSynchro(id): Observable<string> {
    return this.http.get<string>(environment.backend + this.showProjectPath + '/' + id + '/iaasapi/enable')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  disableIaasSynchro(id): Observable<string> {
    return this.http.get<string>(environment.backend + this.showProjectPath + '/' + id + '/iaasapi/disable')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteIaas(id): Observable<string> {
    return this.http.delete<string>(environment.backend + this.showProjectPath + '/' + id + '/iaasapi')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteAsset(id): Observable<string> {
    return this.http.delete<string>(environment.backend + this.showProjectPath + '/' + 'asset/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  saveAsset(id, asset): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/asset/add', asset)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runInfraScanForSelected(id, selected): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/asset/runselected', selected)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runInfraScanForAll(id): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/asset/runall', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runInfraScanForSingle(assetId): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/asset/' + assetId +
      '/runsingle', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  enableInfraAutoScan(id): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/asset/infraautoscan', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  saveWebApp(id, webApp): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/add/webapp', webApp)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  enableWebAppAutoScan(id): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/webapp/webappautoscan', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  updateContactList(id: number, contactList): Observable<string> {
    return this.http.patch<string>(environment.backend + '/show/project/' + id + '/contactlist',
      contactList)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  editCodeProject(id: number, editForm): Observable<string> {
    return this.http.patch<string>(environment.backend + '/show/project/codeproject/' + id ,
      editForm)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  createDepTrackProject(id: number): Observable<string> {
    return this.http.get<string>(environment.backend + '/show/project/codeproject/' + id + '/createdtrack')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runWebAppScanForAll(id): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/webapp/runall', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runWebAppScanForSelected(id, selected): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/webapp/runselected',
      selected)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runWebAppScanForSingle( webappid): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/webapp/' + webappid
      + '/run', webappid)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteWebApp( webappid): Observable<string> {
    return this.http.delete<string>(environment.backend + this.showProjectPath + '/webapp/' + webappid)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  saveCodeGroup(id, codeGroup): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/add/codegroup', codeGroup)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  saveCodeProject(id, codeProject): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/add/codeproject',
      codeProject)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runCodeScanForSelected(id, selected): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/codeproject/runselected',
      selected)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  runCodeScanForSingle(id): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/codeproject/' + id + '/run', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  enableCodeAutoScan(id): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/code/enableautoscan', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  disableCodeAutoScan(id): Observable<string> {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/code/disableautoscan', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteCodeProject(id): Observable<string> {
    return this.http.delete<string>(environment.backend + this.showProjectPath + '/codeproject/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  generateApiKey(id): Observable<ApiKey> {
    return this.http.put<ApiKey>(environment.backend + this.showProjectPath + '/' + id + '/apikey',
      null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getApiKey(id): Observable<ApiKey> {
    return this.http.get<ApiKey>(environment.backend + this.showProjectPath + '/' + id + '/apikey')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  deleteApiKey(id): Observable<string> {
    return this.http.delete<string>(environment.backend + this.showProjectPath + '/' + id + '/apikey')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  disableInfraAutoScan(id: number) {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id + '/asset/infraautoscan/disable',
      null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getCiForProject(id: number): Observable<CiOperations[]> {
    return this.http.get<CiOperations[]>(environment.backend + '/cicd/data/project/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  disableWebAppAutoScan(id: number) {
    return this.http.put<string>(environment.backend + this.showProjectPath + '/' + id +
      '/webapp/webappautoscan/disable', null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }

  getPossibleScanners() {
    return this.http.get<ScannerType[]>(environment.backend + this.showProjectPath + '/scannersavaliable')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  getCodeProjectFromRemote() {
    return this.http.get<SastProject[]>(environment.backend + this.showProjectPath + '/codeprojects')
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
  putProjectToRemote(projectId: number, codeProjectId: number) {
    return this.http.put<SastProject[]>(environment.backend + this.showProjectPath + '/' + projectId + '/createremoteproject/' + codeProjectId, null)
      .pipe(
        retry(1),
        catchError(this.errorHandl),
      );
  }
}
