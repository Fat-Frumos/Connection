import {Component, OnInit} from '@angular/core';
import {Group} from '@app/model/conversation/group.model';
import {GroupService} from '@app/core/service/group.service';
import {ToastService} from '@app/shared/component/toast/toast.service';
import {GroupCreate} from '@app/model/conversation/group-create.model';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group',
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent implements OnInit {

  groups: Group[] = [];

  createGroupModel: GroupCreate;

  updateButtonDisabled: boolean = false;

  countdown: number = 60;

  groupForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastService,
    private groupService: GroupService
  ) {
    this.createGroupModel = {name: ''};
    this.groupForm = fb.group({
      name: ['', [Validators.required.bind(Validators), Validators.maxLength(30)]]
    });
  }

  ngOnInit(): void {
    this.updateGroups();
  }

  updateGroups(): void {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups.Items;
      this.updateButtonDisabled = true;
      this.countdown = 60;

      setTimeout(() => {
        this.updateButtonDisabled = false;
      }, 60000);
    });
  }

  createGroup(): void {
    if (this.groupForm.valid) {
      const nameControl = this.groupForm.get('name');
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
  }

  deleteGroup(groupId: string): void {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.updateGroups();
    });
  }

  goToGroup(id: string): void {
    void this.router.navigate(['/group', id]);
  }
}
