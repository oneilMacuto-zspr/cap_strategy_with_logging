import Context from 'sap/ui/model/odata/v4/Context';
import MessageToast from 'sap/m/MessageToast';


/**
 * Generated event handler.
 *
 * @param this reference to the 'this' that the event handler is bound to.
 * @param pageContext the context of the page on which the event was fired
 */
export function newHeaderActionFn(this: any, a : any, pageContext: Context) {
    MessageToast.show("Navigate to Planning Calendar Page.");

    this.routing.navigateToRoute("CustomPageRoute");

}