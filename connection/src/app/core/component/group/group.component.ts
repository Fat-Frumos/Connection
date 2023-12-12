import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Group} from '@app/model/conversation/group.model';
import {GroupService} from '@app/core/service/group.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {GroupCreate} from '@app/model/conversation/group-create.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AppState} from '@app/ngrx/app/app.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent implements OnInit {

  groups: Group[] = [];

  createGroupModel: GroupCreate;

  canUpdate: boolean = true;

  countdown: number = 60;

  groupForm: FormGroup;

  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastService,
    private store: Store<AppState>,
    private groupService: GroupService
  ) {
    this.createGroupModel = {name: ''};
    this.groupForm = fb.group({
      groupName: ['', [Validators.required.bind(Validators), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.loadGroups();
    // this.groups$ = this.store.select(getGroups);
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups.Items;
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.groups = this.groups.filter(group => {
        return group.id.S !== groupId;
      });
      this.loadGroups();
    });
    // this.store.dispatch(deleteGroup({ groupId }));
  }

  updateGroups(): void {
    if (this.canUpdate) {
      this.isLoading = true;
      this.groupService.getGroups().subscribe(() => {
        this.loadGroups();
        this.isLoading = false;
        this.canUpdate = false;
        this.countdown = 60;
        const interval = setInterval(() => {
          this.countdown--;
          if (this.countdown === 0) {
            clearInterval(interval);
            this.canUpdate = true;
          }
        }, 1000);
      });
    }
    // this.store.dispatch(updateGroup({ group }));
  }


  createGroup(): void {
    if (this.groupForm.valid) {
      const nameControl = this.groupForm.get('groupName');
      console.log(nameControl);
      if (nameControl && typeof nameControl.value === 'string') {
        const groupName: string = nameControl.value;
        this.groupService.createGroup({name: groupName}).subscribe(newGroup => {
          this.groups.push(newGroup);
          this.createGroupModel.name = '';
          this.groupForm.reset();
          this.toast.showMessage('Group created successfully', 'success');
        });
      } else {
        this.toast.showMessage('Invalid form control or value for "name"', 'error');
      }
    }
    // this.store.dispatch(createGroup({ group }));
  }

  goToGroup(id: string): void {
    void this.router.navigate(['/group', id]);
  }
}
