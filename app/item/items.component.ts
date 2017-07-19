import { Component, AfterViewInit } from "@angular/core";

import { Item } from "./item";
import { ItemService } from "./item.service";
import { device } from "platform";
import { DeviceType } from "ui/enums";

import { ScrollView, ScrollEventData } from "ui/scroll-view";
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
import { SwissArmyKnife } from 'nativescript-swiss-army-knife';


const isTablet: boolean = (device.deviceType == DeviceType.Tablet);

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls: ['/app/app.css', (isTablet ? '../tablet.css' : '../phone.css')],
})
export class ItemsComponent implements AfterViewInit {
    items: Item[];
    animateButton = false;

    // This pattern makes use of Angular’s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app’s main NgModule, defined in app.module.ts.
    constructor(private itemService: ItemService) { }

    ngAfterViewInit(): void {
        this.items = this.itemService.getItems();
        this.removeBar();
    }

    addAnimation() {
        console.log("clicked");
        this.animateButton = !this.animateButton
    }

    removeBar() {
        const scrollV = topmost.getViewById("tagView") as ScrollView;
        SwissArmyKnife.removeHorizontalScrollBars(scrollV);
    }
}