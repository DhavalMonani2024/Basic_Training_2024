var pgno = 1;
        
        function validate()
        {
            let firstname = document.forms["register"]["firstname"].value;
            let lastname = document.forms["register"]["lastname"].value;
            let post = document.forms["register"]["post"].value;
            let address1 = document.forms["register"]["address1"].value;
            let address2 = document.forms["register"]["address2"].value;
            let dob = document.forms["register"]["dob"].value;
            let email = document.forms["register"]["email"].value;
            let phonenumber = document.forms["register"]["phone"].value;
            let zipcode = document.forms["register"]["zipcode"].value;
            let sscyear = document.forms["register"]["sscyear"].value;
            let sscpercentage = document.forms["register"]["sscpercentage"].value;
            let sscboard = document.forms["register"]["sscboard"].value;
            let hscyear = document.forms["register"]["hscyear"].value;
            let hscpercentage = document.forms["register"]["hscpercentage"].value;
            let hscboard = document.forms["register"]["hscboard"].value;       
            let bachelorcourse = document.forms["register"]["bachelorcourse"].value;
            let bachelorpassingyear = document.forms["register"]["bachelorpassingyear"].value;
            let bacheloruniversity = document.forms["register"]["bacheloruniversity"].value;
            let bachelorpercentage = document.forms["register"]["bachelorpercentage"].value; 
            let mastercourse = document.forms["register"]["mastercourse"].value;
            let masterpassingyear = document.forms["register"]["masterpassingyear"].value;
            let masteruniversity = document.forms["register"]["masteruniversity"].value;
            let masterpercentage = document.forms["register"]["masterpercentage"].value; 
            let dr = '[1-9][0-9][0-9]{2}/([0][1-9]|[1][0-2])/([1-2][0-9]|[0][1-9]|[3][0-1])';
            let er = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
            if(pgno == 1)
            {
                if(firstname == '' || lastname == '' || post == '' || address1 == '' || address2 == '' || dob == '' || email == '' || phonenumber == '' || zipcode == '')
                {
                    document.getElementById("message").innerHTML = "Please Fill the field"
                    return false;
                }
                if(!dob.match(dr))
                {
                    document.getElementById("message").innerHTML = "Please Fill Birth Date Correctly in YYYY/MM/DD Format"
                    return false;
                }
                if(!email.match(er))
                {
                    document.getElementById("message").innerHTML = "Please Fill Email Correctly"
                    return false;
                }
                if(isNaN(phonenumber) || phonenumber.length !==10)
                {
                    document.getElementById("message").innerHTML = "Please Fill Phone Number Correctly"
                    return false;
                }
                if(isNaN(zipcode) || zipcode.length !== 6)
                {
                    document.getElementById("message").innerHTML = "Please Fill Zipcode Correctly"
                    return false;
                }
                return true;
            }
            if(pgno == 2)
            {
                if(sscyear == '' ||sscboard == '' ||sscpercentage == '')
                {
                    document.getElementById("message").innerHTML = "Please fill all ssc details";
                    return false;
                }
                if(sscyear != '')
                {
                    if(sscboard == '' || sscpercentage == '')
                    {
                        document.getElementById("message").innerHTML = "Please Fill all ssc details"
                        return false;
                    }
                    else if(isNaN(sscyear) || sscyear.length !== 4)
                    {
                        document.getElementById("message").innerHTML = "Please Fill SSC year Correctly"
                        return false;
                    }
                }
                if(hscyear == '' ||hscboard == '' ||hscpercentage == '')
                {
                    document.getElementById("message").innerHTML = "Please fill all hsc details";
                    return false;
                }
                if(hscyear != '')
                {
                    if(hscboard == '' || hscpercentage == '')
                    {
                        document.getElementById("message").innerHTML = "Please Fill all remaining hsc details"
                        return false;
                    }
                    else if(isNaN(hscyear) || hscyear.length !== 4)
                    {
                        document.getElementById("message").innerHTML = "Please Fill HSC year Correctly"
                        return false;
                    }
                }
                if(bachelorcourse == '' ||bachelorpassingyear == '' ||bachelorpercentage == ''||bacheloruniversity == '')
                {
                    document.getElementById("message").innerHTML = "Please fill all bachelor details";
                    return false;
                }
                if(bachelorcourse != '')
                {
                    if(bachelorpassingyear == '' || bachelorpercentage == '' ||bacheloruniversity == '')
                    {
                        document.getElementById("message").innerHTML = "Please Fill all bachelor details"
                        return false;
                    }
                    else if(isNaN(bachelorpassingyear) || bachelorpassingyear.length !== 4)
                    {
                        document.getElementById("message").innerHTML = "Please Fill bachelor passing year Correctly"
                        return false;
                    }
                }
                if(mastercourse != '')
                {
                    if(masterpassingyear == '' || masterpercentage == '' ||masteruniversity == '')
                    {
                        document.getElementById("message").innerHTML = "Please Fill all master details"
                        return false;
                    }
                    else if(isNaN(masterpassingyear) || masterpassingyear.length !== 4)
                    {
                        document.getElementById("message").innerHTML = "Please Fill master passing year Correctly"
                        return false;
                    }
                }

                return true;

            }   
            if(pgno == 3)
            {
                let cn = document.getElementsByName("companyname[]");
                let ds = document.getElementsByName("designation[]");
                let fr = document.getElementsByName("from[]");
                let to = document.getElementsByName("to[]");
                let flag = 0;
                cn.forEach((element,index)=>{
                    if(element.value != '')
                    {
                        if(ds[index].value == '' ||fr[index].value == '' ||to[index].value == '' )
                        {
                            flag = 1;
                        }
                    }
                })
                if(flag == 1)
                {
                    document.getElementById("message").innerHTML = "Please Enter all WORK REFERENCE details";
                }
                else
                {
                    return true;
                }
                
            }
            if(pgno == 4)
            {

                let hindi = document.getElementById('hindi').checked;
                let english = document.getElementById('english').checked;
                let gujarati = document.getElementById('gujarati').checked;
                if(hindi)
                {
                    let hindican = document.getElementsByName("hindican[]");
                    let hc = [];
                    for(var i=0;i<hindican.length;i++)
                    {
                        hc.push(hindican[i].checked);
                    }   
                    if(!hc.includes(true))
                    {
                        document.getElementById("message").innerHTML = "Please select value for hindi language";
                        return false;
                    }
                }
                if(english)
                {
                    let englishcan = document.getElementsByName("englishcan[]");
                    let ec = [];
                    for(var i=0;i<englishcan.length;i++)
                    {
                        ec.push(englishcan[i].checked);
                    }      
                    if(!ec.includes(true))
                    {
                        document.getElementById("message").innerHTML = "Please select value for english language";
                        return false;
                    }
                
                }
                if(gujarati)
                {
                    let gujaratican = document.getElementsByName("gujaratican[]");
                    let gc = [];
                    for(var i=0;i<gujaratican.length;i++)
                    {
                        gc.push(gujaratican[i].checked);
                    }   
                    if(!gc.includes(true))
                    {
                        document.getElementById("message").innerHTML = "Please select value for gujarati language";
                        return false;
                    }   
                
                }
                if((!hindi) && (!english) && (!gujarati))
                {
                    document.getElementById("message").innerHTML = "PLease select any one language";
                    return false;
                }

                let php = document.getElementById('php').checked;
                let mysql = document.getElementById('mysql').checked;
                let laravel = document.getElementById('laravel').checked;
                let oracle = document.getElementById('oracle').checked;
                if(php)
                {
                    let phplevel = document.getElementsByName('php_level[]');
                    let pl = [];
                    for(var i=0;i<phplevel.length;i++)
                    {
                        pl.push(phplevel[i].checked);

                    }
                    if(!pl.includes(true))
                    {
                        document.getElementById('message').innerHTML = "Please select one level for php";
                        return false;
                    }
                }
                if(mysql)
                {
                    let mysqllevel = document.getElementsByName('mysql_level[]');
                    let ml = [];
                    for(var i=0;i<mysqllevel.length;i++)
                    {
                        ml.push(mysqllevel[i].checked);

                    }
                    if(!ml.includes(true))
                    {
                        document.getElementById('message').innerHTML = "Please select one level for mysql";
                        return false;
                    }
                }
                if(laravel)
                {
                    let laravellevel = document.getElementsByName('laravel_level[]');
                    let ll = [];
                    for(var i=0;i<laravellevel.length;i++)
                    {
                        ll.push(laravellevel[i].checked);

                    }
                    if(!ll.includes(true))
                    {
                        document.getElementById('message').innerHTML = "Please select one level for laravel";
                        return false;
                    }
                }
                if(oracle)
                {
                    let oraclelevel = document.getElementsByName('oracle_level[]');
                    let ol = [];
                    for(var i=0;i<oraclelevel.length;i++)
                    {
                        ol.push(oraclelevel[i].checked);

                    }
                    if(!ol.includes(true))
                    {
                        document.getElementById('message').innerHTML = "Please select one level for oracle";
                        return false;
                    }
                }
                if((!php) && (!mysql) && (!laravel) && (!oracle))
                {
                    document.getElementById('message').innerHTML = "please check any one technology";
                    return false;
                }

                return true;

            }
            if(pgno == 5)
            {
                let conname = document.getElementsByName('contactname[]');
                let connum = document.getElementsByName('contactnumber[]');
                let rel = document.getElementsByName('relation[]');
                let flag = 0;
                conname.forEach((element,index)=>{
                    if(element.value != '')
                    {
                        if(connum[index].value == '' || rel[index].value == '')
                        {
                            flag = 1;
                        }
                    }
                
                })
                if(flag == 1)
                {
                    document.getElementById('message').innerHTML = 'please enter all contact details';
                }
                else
                {
                    return true;
                }
            }
            
            
            if(pgno == 6)
            {
                let location = document.forms["register"]["prefered_location"].value;
                let noticeperiod = document.forms["register"]["notice_period"].value;
                let currentctc = document.forms["register"]["current_ctc"].value;
                let expectedctc = document.forms["register"]["expected_ctc"].value;
                if(location == '' || noticeperiod == '' || currentctc == '' || expectedctc == '')
                {
                    document.getElementById('message').innerHTML = "Please enter all preferences";
                    return false;
                }
            }

           et();
            
        }
        function next()
        {
            document.getElementById("message").innerHTML =  '';
            let section = document.getElementsByClassName('sh');
            let ctn = validate();
            if(ctn)
            {
                if(pgno == 1)
                {
                    document.getElementById('prev').style.display = 'block';
                }
                else if(pgno == 5)
                {
                    document.getElementById('next').style.display = 'none';    
                }
            
                document.getElementById(pgno).style.display = 'none';
                section[pgno-1].style.background = 'white';
                pgno+=1;
                document.getElementById(pgno).style.display = 'block';
                section[pgno-1].style.background = 'blue';
            }
            
            
        }
        function prev()
        {
            document.getElementById(pgno).style.display = 'none';
            let section = document.getElementsByClassName('sh');
            section[pgno-1].style.background = 'white';
            pgno-=1;
            section[pgno-1].style.background = 'blue';
            if(pgno == 5)
            {
                document.getElementById('next').style.display = 'block';    
            }
            else if(pgno == 1)
            {
                document.getElementById('prev').style.display = 'none';
            }
            document.getElementById(pgno).style.display = 'block';
        }
        async function sub()
        {
            const queryString = window.location.href;
            if(queryString.includes('studentform'))
            {
                let form = document.getElementById('register');
                const data = new URLSearchParams(new FormData(form));
                let bodyData = await fetch('http://localhost:3000/studentform',{
                    method:"POST",
                    headers: {
                            'Content-Type': ' application/x-www-form-urlencoded'
                    },
                    body: data
                });
                alert('form submitted successfully!!')
                window.location.href='http://localhost:3000/studentform';
            }
        }
        async function update(id)
        {
           const response = await fetch(`http://localhost:3000/update?Id=${id}`,{
            method:"POST"
           });
            const data = await response.json();
            return data;
        }
        let data;
        async function verify()
        {
            var date = new Date();
            console.log("Hello From Verify")
            let section = document.getElementsByClassName('sh');
        section[0].style.background = 'blue';
            const queryString = window.location.href;
            let qs = window.location.search;
            if(queryString.includes('update'))
            {
                let params = new URLSearchParams(qs);
                let id = params.get('Id');
                data = await update(id);
                let basicdetails = data.basicdetails;
                let keys = Object.keys(basicdetails);
                for(var i=1;i<keys.length;i++)
                {
                    if(keys[i] == 'dob')
                    {
                        let date = new Date(basicdetails[keys[i]]);
                        let birth_date = date.toLocaleDateString('en-ZA');
                         document.getElementById(keys[i]).value = birth_date;     
                    }
                    else if(keys[i] == 'gender')
                    {
                        let selectedgender = basicdetails[keys[i]];
                        document.getElementById(selectedgender).checked = true;
                    }
                    else if(keys[i] == 'relationship')
                    {
                        let rs = basicdetails[keys[i]];
                        document.getElementById('rs').value = rs;
                    }
                    else
                    {
                        document.getElementById(keys[i]).value = basicdetails[keys[i]];
                    }
                }
                let educationaldetails = data.educationaldetails;
                let ek = Object.keys(educationaldetails);
                for(var i=1;i<ek.length;i++)
                {
                    if(educationaldetails[ek[i]] != null)
                    {
                        document.getElementById(ek[i]).value = educationaldetails[ek[i]];
                    }
                    else
                    {
                        document.getElementById(ek[i]).disabled = true;
                    }
                }

                let experience = data.experience;
                document.getElementById('rws').innerHTML = '';
                if(experience != undefined)
                {
                    let dt = '';
                    experience.forEach((row=>{
                        dt += `<tr>
                            <td><input type="text" name="eid[]" value='${row.eid}'
                        <td><input type="text" name="company_name[]" value='${row.company_name}'>
                            <td><input type="text" name="company_designation[]" value='${row.company_designation}'>
                                <td><input type="text" name="from_date[]" value='${new Date(row.from_date).toLocaleDateString('en-ZA')}'>
                                    <td><input type="text" name="to_date[]" value='${new Date(row.to_date).toLocaleDateString('en-ZA')}'>
                                        </tr>`;
                                    
                    }))
                    document.getElementById('rws').innerHTML = dt;
                }
                
                
               
                let languages = data.languages;
                languages.forEach((row=>{
                    if(row.language_known == 'hindi')
                    {
                        document.getElementById('hindi').checked = true;
                        let opt = document.getElementsByName('hindican[]');
                        opt.forEach((rw=>{
                            if(row.can_read == 'y')
                            {
                                opt[0].checked = true;  
                            }
                            if(row.can_write == 'y')
                            {
                                opt[1].checked = true;  
                            }
                            if(row.can_speak == 'y')
                            {
                                opt[2].checked = true;  
                            }
                        }))
                    }
                    if(row.language_known == 'english')
                    {
                        document.getElementById('english').checked = true;
                        let opt = document.getElementsByName('englishcan[]');
                        opt.forEach((rw=>{
                            if(row.can_read == 'y')
                            {
                                opt[0].checked = true;  
                            }
                            if(row.can_write == 'y')
                            {
                                opt[1].checked = true;  
                            }
                            if(row.can_speak == 'y')
                            {
                                opt[2].checked = true;  
                            }
                        }))
                    }
                    if(row.language_known == 'gujarati')
                    {
                        document.getElementById('gujarati').checked = true;
                        let opt = document.getElementsByName('gujaratican[]');
                        opt.forEach((rw=>{
                            if(row.can_read == 'y')
                            {
                                opt[0].checked = true;  
                            }
                            if(row.can_write == 'y')
                            {
                                opt[1].checked = true;  
                            }
                            if(row.can_speak == 'y')
                            {
                                opt[2].checked = true;  
                            }
                        }))
                    }
                }))
                let technology = data.technologies;
                technology.forEach((row=>{
                    if(row.technology_known == 'php')
                    {
                        document.getElementById('php').checked = true;
                        let opt = document.getElementsByName('php_level[]');
                        opt.forEach((rw=>{
                            if(row.technology_level == 'Beginner')
                            {
                                opt[0].checked = true;  
                            }
                            if(row.technology_level == 'moderate')
                            {
                                opt[1].checked = true;  
                            }
                            if(row.technology_level == 'expert')
                            {
                                opt[2].checked = true;  
                            }
                        }))
                    }
                    if(row.technology_known == 'mysql')
                    {
                        document.getElementById('mysql').checked = true;
                        let opt = document.getElementsByName('mysql_level[]');
                        opt.forEach((rw=>{
                            if(row.technology_level == 'Beginner')
                            {
                                opt[0].checked = true;  
                            }
                            if(row.technology_level == 'moderate')
                            {
                                opt[1].checked = true;  
                            }
                            if(row.technology_level == 'expert')
                            {
                                opt[2].checked = true;  
                            }
                        }))
                    }
                    if(row.technology_known == 'laravel')
                    {
                        document.getElementById('laravel').checked = true;
                        let opt = document.getElementsByName('laravel_level[]');
                        opt.forEach((rw=>{
                            if(row.technology_level == 'Beginner')
                            {
                                opt[0].checked = true;  
                            }
                            if(row.technology_level == 'moderate')
                            {
                                opt[1].checked = true;  
                            }
                            if(row.technology_level == 'expert')
                            {
                                opt[2].checked = true;  
                            }
                        }))
                    }
                    if(row.technology_known == 'oracle')
                    {
                        document.getElementById('oracle').checked = true;
                        let opt = document.getElementsByName('oracle_level[]');
                        opt.forEach((rw=>{
                            if(row.technology_level == 'Beginner')
                            {
                                opt[0].checked = true;  
                            }
                            if(row.technology_level == 'moderate')
                            {
                                opt[1].checked = true;  
                            }
                            if(row.technology_level == 'expert')
                            {
                                opt[2].checked = true;  
                            }
                        }))
                    }
                }))
                let contacts = data.references;
                document.getElementById('cts').innerHTML = '';
                if(contacts != undefined)
                {
                    let ct = '';
                    contacts.forEach((row=>{
                        ct+=`<tr>
                            <td><input type="hidden" name="cid[]" value='${row.cid}'></td>
                            <td><input type="text" name="contact_name[]" value='${row.contact_name}'></td>
                            <td><input type="text" name="contact_number[]" value='${row.contact_number}'></td>
                            <td><input type="text" name="contact_relation[]" value='${row.contact_relation}'></td>
                            </tr>`;
                        }))
                        document.getElementById('cts').innerHTML = ct;
                }
                

                let preferences = data.preferences;
                if(preferences != undefined)
                {
                    let pk = Object.keys(preferences);
                    for(var i=2;i<pk.length-1;i++)
                    {
                        document.getElementById(pk[i]).value = preferences[pk[i]]
                    }
                }
                
           
           }
        }
        function et()
        {
            const queryString = window.location.href;
            if(queryString.includes('studentform'))
            {
                    sub();
            }
            if(queryString.includes('update'))
            {
                    u();
            }
        }
        async function u()
        {
                
                let qs = window.location.search;
                let params = new URLSearchParams(qs);
                let id = params.get('Id');
                let form = document.getElementById('register');
                const data = new URLSearchParams(new FormData(form));
                let bodyData = await fetch(`http://localhost:3000/reinsert?Id=${id}`,{
                method:"post",
                headers: {
                        'Content-Type': ' application/x-www-form-urlencoded'
                },
                body: data
             });
            let message = await bodyData.json();
            alert(message.alert);
            window.location.href='http://localhost:3000/studentlist'
        }