import { Component, Input, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  ContactsService,
  SearchParams,
  fetchResponse
} from "./../../../../services/api/contacts.service";
import { Contact } from "./../../../../models/contact.model";
import { SdkTableColumn } from "./../../../../sdk/features/table/table.model";
import { ContactState, formIdContact, formRouteContact } from "./../../../../state/contacts/contacts.state";
import { ConstantState } from "./../../../../state/constants/constants.state";
import { FetchContacts } from "./../../../../state/contacts/contacts.actions";
import { country } from "./../../../../shared/constants/constantTypeCodes";
import {
  parseDate,
  parseDateTime
} from "./../../../../shared/functions/parsing.functions";
import { parseLastModified } from "./../../../../sdk/features/table/table.functions";
import { Constant } from "./../../../../models/constant.model";
import { ConstantParsingService } from "./../../../../services/constant-parsing.service";
import { Router } from "@angular/router";
import { EditButtonRenderer } from "./../../../../shared/cell-renderers/cell-renderers.component";
import { SetForm } from '../../../../sdk/features/master-form/master-form.actions';

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.scss"]
})
export class ContactsComponent {
  formId =  formIdContact;
  formRoute = formRouteContact;
  @Select(ConstantState.constantValues)
  constantValues$: Observable<Constant[]>;
  @Select(ContactState.contacts)
  rows$: Observable<any[]>;
  rows: any[];
  @Select(ContactState.totalRecords)
  totalRecords$: Observable<number>;
  @Select(ContactState.isFetching)
  loading$: Observable<boolean>;
  constantValues: Constant[] = [];
  tableId = "Contact Master";
  addRoute = "/contacts/add-edit";
  addLabel = "Add Contact";
  searchParams = new SearchParams();
  searchInputExists: boolean = true;
  tableHeight: string = "80vh";
  rowHeight: number = 36;
  editColumnEnabled: boolean = true;
  onEdit = (recordId) => {
    this.store.dispatch(new SetForm(this.formId, recordId));
    this.router.navigateByUrl(this.formRoute);
  }
  editColumn: SdkTableColumn = {
    field: "edit",
    headerName: "Edit",
    width: 55,
    pinned: "left",
    cellRenderer: "editButtonRenderer",
    cellRendererParams: {
      onEdit: this.onEdit,
    },
    sortable: false
  };
  frameworkComponents: Object = {
    editButtonRenderer: EditButtonRenderer
  };
  columns: SdkTableColumn[] = [
    {
      field: "firstName",
      headerName: `First Name`,
      sortable: true,
      resizable: true
    },
    {
      field: "lastName",
      headerName: `Last Name`,
      sortable: true,
      resizable: true
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      cellRenderer: params => {
        return parseDate(params.value);
      },
      sortable: true,
      resizable: true
    },
    {
      field: "email",
      headerName: "Email",
      sortable: true,
      resizable: true
    },
    {
      field: "phoneDetails",
      headerName: "Phone",
      cellRenderer: params => {
        return `+${params.value.countryCode} ${params.value.phoneNumber}`;
      },
      sortable: true,
      resizable: true
    },
    {
      field: "city",
      headerName: "City",
      sortable: true,
      resizable: true
    },
    {
      field: "state",
      headerName: "State",
      sortable: true,
      resizable: true
    },
    {
      field: "country",
      headerName: "Country",
      cellRenderer: params => {
        return this.parseConstant(country, params.value);
      },
      sortable: true,
      resizable: true
    }
  ];
  fetchContacts(searchParams) {
    this.store.dispatch(new FetchContacts(searchParams));
  }
  parseConstant(constantTypeCode, constantCode): string {
    return this.constantService.parseConstant(
      this.constantValues,
      constantTypeCode,
      constantCode
    );
  }

  constructor(
    private store: Store,
    private contactsService: ContactsService,
    private constantService: ConstantParsingService,
    private router: Router
  ) {
    this.constantValues$.subscribe(value => {
      this.constantValues = value;
    });
    this.rows$.subscribe(value => {
      this.rows = value;
    });
    //Injecting the edit column if it is enabled
    if (this.editColumnEnabled) {
      this.columns = [this.editColumn].concat(this.columns);
    }
  }

  ngOnInit() {
    this.fetchContacts(this.searchParams);
  }
}
