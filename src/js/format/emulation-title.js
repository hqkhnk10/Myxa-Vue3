import { globals } from "@/main";

// format to return label base on value

export function formatApplyObject(value){
    switch(value){
        case globals.$enum?.EmulationTitle.ApplyObject.Person: //2
            return globals.t('emulationTitle.personal')
        case globals.$enum?.EmulationTitle.ApplyObject.Organization: //1
            return globals.t('emulationTitle.group')
        case globals.$enum?.EmulationTitle.ApplyObject.PersonAndOrg: //3
            return globals.t('emulationTitle.personalAndOrganization')
        default:
            return ''
    }
}
export function formatCommendationLevel(value){
    switch(value){
        case globals.$enum?.EmulationTitle.CommendationLevel.CapXa: //3
            return globals.t('emulationTitle.communeLevel')
        case globals.$enum?.EmulationTitle.CommendationLevel.CapHuyen: //2
            return globals.t('emulationTitle.districtLevel')
            case globals.$enum?.EmulationTitle.CommendationLevel.CapTinh: //1
            return globals.t('emulationTitle.provinceLevel')
        case globals.$enum?.EmulationTitle.CommendationLevel.CapNhaNuoc: //0
            return globals.t('emulationTitle.countryLevel')
        default:
            return ''
    }
}
export function formatMovementType(value){
    switch(value){
        case globals.$enum?.EmulationTitle.MovementType.Sometimes: //0
            return globals.t('emulationTitle.regular')
        case globals.$enum?.EmulationTitle.MovementType.Period: //1
            return globals.t('emulationTitle.period')
        case globals.$enum?.EmulationTitle.MovementType.SometimesAndPeriod: //2
            return globals.t('emulationTitle.regularAndPeriod')
        default:
            return ''
    }
}
export function formatStatus(value){
    switch(value){
        case globals.$enum?.EmulationTitle.Active: //0
            return {label: globals.t('reuse.using'), class: 'icon-round-active'}
        case globals.$enum?.EmulationTitle.Inactive: //1
            return {label: globals.t('reuse.shutdown'), class: 'icon-round-inactive'}
        default:
            return ''
    }
}