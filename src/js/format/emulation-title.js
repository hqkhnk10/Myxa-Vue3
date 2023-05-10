import { globals } from "@/main";

// format to return label base on value

export function formatApplyObject(value){
    switch(value){
        case globals.$enum?.EmulationTitle.ApplyObject.Person:
            return globals.t('emulationTitle.personal')
        case globals.$enum?.EmulationTitle.ApplyObject.Organization:
            return globals.t('emulationTitle.group')
        default:
            return ''
    }
}
export function formatCommendationLevel(value){
    switch(value){
        case globals.$enum?.EmulationTitle.CommendationLevel.CapXa:
            return globals.t('emulationTitle.communeLevel')
        case globals.$enum?.EmulationTitle.CommendationLevel.CapHuyen:
            return globals.t('emulationTitle.districtLevel')
            case globals.$enum?.EmulationTitle.CommendationLevel.CapTinh:
            return globals.t('emulationTitle.provinceLevel')
        case globals.$enum?.EmulationTitle.CommendationLevel.CapNhaNuoc:
            return globals.t('emulationTitle.countryLevel')
        default:
            return ''
    }
}
export function formatMovementType(value){
    switch(value){
        case globals.$enum?.EmulationTitle.MovementType.Sometimes:
            return globals.t('emulationTitle.regular')
        case globals.$enum?.EmulationTitle.MovementType.Period:
            return globals.t('emulationTitle.period')
        default:
            return ''
    }
}
export function formatStatus(value){
    switch(value){
        case globals.$enum?.EmulationTitle.Active:
            return {label: globals.t('reuse.using'), class: 'icon-round-active'}
        case globals.$enum?.EmulationTitle.Inactive:
            return {label: globals.t('reuse.shutdown'), class: 'icon-round-inactive'}
        default:
            return ''
    }
}