function validate()
        {
            let firstname = document.forms["register"]["firstname"].value;
            let lastname = document.forms["register"]["lastname"].value;
            let post = document.forms["register"]["post"].value;
            let address1 = document.forms["register"]["address1"].value;
            let address2 = document.forms["register"]["address2"].value;
            let dob = document.forms["register"]["dob"].value;
            let email = document.forms["register"]["email"].value;
            let phonenumber = document.forms["register"]["phonenumber"].value;
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
            let cn = document.getElementsByName("companyname[]");
            let ds = document.getElementsByName("designation[]");
            let fr = document.getElementsByName("from[]");
            let to = document.getElementsByName("to[]");
            cn.forEach((element,index)=>{
                if(element.value !== '')
                {
                   if(ds[index].value == '' ||fr[index].value == '' ||to[index].value == '' )
                   {
                        console.log("inside contact name")
                        document.getElementById("message").innerHTML = "Please Enter all WORK REFERENCE details";
                        return false;
                    }
                }
            })
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
                console.log(ol);
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
            let conname = document.getElementsByName('contactname[]');
            let connum = document.getElementsByName('contactnumber[]');
            let rel = document.getElementsByName('relation[]');
            conname.forEach((element,index)=>{
                if(element.value != '')
                {
                    if(connum[index].value == '' || rel[index].value == '')
                    {
                       document.getElementById('message').innerHTML = "PLease enter all contact reference details";
                       return false;
                    }
                }
                
            })
            
          
            let noticeperiod = document.forms["register"]["noticeperiod"].value;
            let currentctc = document.forms["register"]["currentctc"].value;
            let expectedctc = document.forms["register"]["expectedctc"].value;
            if(noticeperiod == '' || currentctc == '' || expectedctc == '')
            {
                document.getElementById('message').innerHTML = "Please enter all preferences";
                return false;
            }


        }