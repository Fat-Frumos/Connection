import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Group} from '@app/model/conversation/group.model';
import {GroupService} from '@app/core/service/group.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {GroupCreate} from '@app/model/conversation/group-create.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

const MINUTE = 60;

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class GroupComponent implements OnInit {

  createGroupModel: GroupCreate;

  countdown: number = MINUTE;

  isLoading = false;

  canUpdate: boolean = true;

  groupForm: FormGroup;

  groups: Group[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastService,
    private groupService: GroupService
  ) {
    this.createGroupModel = {name: ''};
    this.groupForm = fb.group({
      groupName: ['', [Validators.required.bind(Validators), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups.Items;
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();
    });
  }

  updateGroups(): void {
    if (this.canUpdate) {
      this.isLoading = true;
      this.groupService.getGroups().subscribe(() => {
        this.isLoading = false;
        this.countdown = MINUTE;
        this.canUpdate = this.toast.count(this.countdown);
        this.loadGroups();
      });
    }
  }

  createGroup(): void {
    if (this.groupForm.valid) {
      const control = this.groupForm.get('groupName');
      if (control) {
        const groupName: string = control.value as string;
        if (groupName) {
          this.groupService.createGroup(groupName).subscribe(newGroup => {
            this.toast.showMessage(`Group created successfully${newGroup.id.S} ${newGroup.createdBy.S}`, 'success');
            this.createGroupModel.name = '';
            this.groupForm.reset();
            this.loadGroups();
          });
        }
      } else {
        this.toast.showMessage('Invalid form control or value for "name"', 'error');
      }
    }
  }

  goToGroup(group: Group): void {
    void this.router.navigate(['/group', group.id.S]);
  }
}
