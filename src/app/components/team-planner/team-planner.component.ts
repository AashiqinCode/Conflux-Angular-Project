import { Component, OnInit } from '@angular/core';
import { TeamPlannerService } from 'src/app/services/team-planner.service';
import { Team } from 'src/assets/Team';

@Component({
  selector: 'app-team-planner',
  templateUrl: './team-planner.component.html',
  styleUrls: ['./team-planner.component.css']
})
export class TeamPlannerComponent implements OnInit {
  
  displayDialog: boolean;

  team: Team = {};

  selectedTeam: Team;

  newTeam: boolean;

  teams: Team[];

  cols: any[];

  constructor(private teamPlannerService: TeamPlannerService) { }

  ngOnInit() {
      this.teamPlannerService.getTeamListFromJson().
      then(teams => this.teams = teams);
	  
	  this.teamPlannerService.getTeamListFromJson().then(teams => this.teams = teams);

        this.cols = [
            { field: 'releaseName', header: 'Release Name' },
            { field: 'userName', header: 'User Name' },
            { field: 'model', header: 'Model' },
            { field: 'role', header: 'Role' },
			{ field: 'availability', header: 'Availability' }
        ];
		
  }
  
showDialogToAdd() {
    this.newTeam = true;
    this.team = {};
    this.displayDialog = true;
}

save() {
    let teams = [...this.teams];
    if (this.newTeam)
        teams.push(this.team);
    else
        teams[this.teams.indexOf(this.selectedTeam)] = this.team;
	
	this.teamPlannerService.addTeam(this.team);
	
    this.teams = teams;
    this.team = null;
    this.displayDialog = false;
	
	
}

delete() {
    let index = this.teams.indexOf(this.selectedTeam);
    this.teams = this.teams.filter((val, i) => i != index);
    this.team = null;
    this.displayDialog = false;
}

onRowSelect(event) {
    this.newTeam = false;
    this.team = this.cloneTeam(event.data);
    this.displayDialog = true;
}

cloneTeam(c: Team): Team {
    let team = {};
    for (let prop in c) {
        team[prop] = c[prop];
    }
    return team;
}

}