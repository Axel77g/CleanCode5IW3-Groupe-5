import {EventObserver} from "../../../common/observers/EventObserver";

/**
 * Nécessaire pour le framework Next JS en raison de la gestion des Server Actions,
 * Pendant une server Action, l'EventObserver est instancié de nouveau pour une raison étrange, les listeners sont perdus
 * Mais l'identifiant de processus (PID) semble être le même, donc nous utilisons une variable globale pour garder la même instance
 */

//@ts-ignore
if(!globalThis.eventObserver){
    //@ts-ignore
    globalThis.eventObserver = new EventObserver()
}
//@ts-ignore
export const eventObserver : EventObserver = globalThis.eventObserver