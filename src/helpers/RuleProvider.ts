
const RuleProvider = {
    setRules(name : string, required :boolean ,nospace :boolean, number :boolean, email :boolean, minchar: number , maxchar: number | false, textonly :boolean ) {
        let rules: any[] = [];
        if(required === true)
        {
            rules.push( (v :any) => {
                if(v == null || v == "")
                {
                    return name + ' is required'
                }
            });
        }
        if(nospace === true)
        {
            rules.push((v :any) => {
                const value = typeof v === 'string' ? v : String(v);
                return !value || !value.startsWith(' ') || name + ' cannot start with space';
            });
            rules.push((v :any) => {
                const value = typeof v === 'string' ? v : String(v);
                return !value || !value.endsWith(' ') || name + ' cannot end with space';
            });
            rules.push((v :any) => {
                const value = typeof v === 'string' ? v : String(v);
                return !value || !value.includes('  ') || name + ' cannot have consecutive spaces';
            });
        }
        if(number === true)
        {
            rules.push( (v :any) => !v || /^\d+$/.test(v) || 'Only numbers are allowed')
        }
        if(email === true)
        {
            rules.push(  (v :any) => v? /^[\w-]+([.][\w-]+)*@([\w-]+[.])+[a-zA-Z]{2,7}$/.test(v) || 'Must be a valid email (example: yourname@example.com)':null)
        }
        if(minchar && (minchar !== null || minchar !== false))
        { 
            rules.push((v :any) => v? (v.length >= minchar) || name + ' must be at least ' + minchar + ' characters' : null);
        }
        if( maxchar && (maxchar !== null || maxchar !== false))
        {
            rules.push( (v :any) => !v || v.length <= maxchar || name +' must be at most '+ maxchar +' characters')
        }
        if(textonly === true)
        {
            rules.push( (v :any) => /^[a-zA-Z ]*$/.test(v) || name + ' can only contain letters and spaces',)
        }
        return rules
    }
}
export {RuleProvider}
