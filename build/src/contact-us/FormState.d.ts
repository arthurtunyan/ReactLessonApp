export namespace initialState {
    export namespace inquiry {
        let isTouched: boolean;
        namespace validationRules {
            let required: boolean;
            let min: number;
            let max: number;
            let email: boolean;
        }
        let isValid: boolean;
        let value: string;
    }
    export namespace name {
        let isTouched_1: boolean;
        export { isTouched_1 as isTouched };
        export namespace validationRules_1 {
            let required_1: boolean;
            export { required_1 as required };
            let min_1: number;
            export { min_1 as min };
            let max_1: number;
            export { max_1 as max };
            let email_1: boolean;
            export { email_1 as email };
        }
        export { validationRules_1 as validationRules };
        let isValid_1: boolean;
        export { isValid_1 as isValid };
        let value_1: string;
        export { value_1 as value };
    }
    export namespace email_2 {
        let isTouched_2: boolean;
        export { isTouched_2 as isTouched };
        export namespace validationRules_2 {
            let required_2: boolean;
            export { required_2 as required };
            let min_2: number;
            export { min_2 as min };
            let max_2: number;
            export { max_2 as max };
            let email_3: boolean;
            export { email_3 as email };
        }
        export { validationRules_2 as validationRules };
        let isValid_2: boolean;
        export { isValid_2 as isValid };
        let value_2: string;
        export { value_2 as value };
    }
    export { email_2 as email };
    export namespace message {
        export namespace validationRules_3 {
            let required_3: boolean;
            export { required_3 as required };
            let min_3: number;
            export { min_3 as min };
            let max_3: number;
            export { max_3 as max };
            let email_4: boolean;
            export { email_4 as email };
        }
        export { validationRules_3 as validationRules };
        let isValid_3: boolean;
        export { isValid_3 as isValid };
        let isTouched_3: boolean;
        export { isTouched_3 as isTouched };
        let value_3: string;
        export { value_3 as value };
    }
    export namespace attachment {
        let value_4: null;
        export { value_4 as value };
    }
}
export namespace actions {
    let UPDATE_FIELD: string;
    let TOUCH_FIELD: string;
    let RESET: string;
}
export function reducer(state: any, action: any): any;
//# sourceMappingURL=FormState.d.ts.map