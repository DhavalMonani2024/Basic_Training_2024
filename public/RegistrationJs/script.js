function validate()
{
    let firstname = document.getElementById('firstname').value;
    let lastname = document.getElementById('lastname').value;
    let email = document.getElementById('email').value;
    let dob = document.getElementById('dob').value;
    let dr = '[1-9][0-9][0-9]{2}/([0][1-9]|[1][0-2])/([1-2][0-9]|[0][1-9]|[3][0-1])';
    let er = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$';
    if(firstname == '' || lastname == '' || email == '' || dob == '')
    {
        document.getElementById("message").innerHTML = "Please Fill All the Fields"
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
    submit();
}

async function submit()
{
    const queryString = window.location.href;
    if(queryString.includes('registration'))
    {
        let form = document.getElementById('register');
        const data = new URLSearchParams(new FormData(form));
        let bodyData = await fetch('http://localhost:3000/registration',{
            method:"POST",
            headers: {
                    'Content-Type': ' application/x-www-form-urlencoded'
            },
            body: data
        });
       let al = await bodyData.json();
       if(al.code == 1)
       {
            let activationlink = al.activationlink;
            let id = al.id;
            document.getElementById('al').style.display='block';
            document.getElementById('al').innerHTML = `Account Created Successfull please copy this link and paste in url http://localhost:3000/active?ac=${activationlink}&Id=${id} For Activating the account`;
       }
       else
       {
            let message = al.message;
            alert(message)
       }
       
    }
}

function validatepassword()
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('Id')
    let password = document.getElementById('password').value;
    let confirmpassword = document.getElementById('confirmpassword').value;
    let pr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if(password == '' || confirmpassword == '')
    {
        document.getElementById('message').innerHTML = 'PLease Enter Password and confirm password';
        return false;
    }
    if(!password.match(pr))
    {
        document.getElementById('message').innerHTML = 'PLease Follow the Password guidelines';
        return false;
    }
    if(password != confirmpassword)
    {
        document.getElementById('message').innerHTML = `password and confirm password doesn't match`;
        return false;
    }
    passwordvalid(id);
}

async function passwordvalid(id)
{

    const queryString = window.location.href;
    if(queryString.includes('active'))
    {
        let form = document.getElementById('passwordform');
        const data = new URLSearchParams(new FormData(form));
        let bodyData = await fetch(`http://localhost:3000/active?Id=${id}`,{
            method:"POST",
            headers: {
                    'Content-Type': ' application/x-www-form-urlencoded'
            },
            body: data
        });
        let message = await bodyData.json();
        if(message.code == 1)
        {
            alert(message.alert)
            window.location.href='http://localhost:3000/login';
        }
            
       
    }

}

function login()
{
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let pr = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if(username == '' || password == '')
    {
        document.getElementById('message').innerHTML = 'Please Fill username and password';
        return false;
    }
    if(!password.match(pr))
    {
        document.getElementById('message').innerHTML = 'PLease enter valid password';
        return false;
    }

    loginprocess();
}

async function loginprocess()
{
    let form = document.getElementById('loginform');
    const data = new URLSearchParams(new FormData(form));
    let bodyData = await fetch(`http://localhost:3000/login`,{
        method:"POST",
        headers: {
                'Content-Type': ' application/x-www-form-urlencoded'
        },
        body: data
    });
    let message = await bodyData.json();
   if(message.code == 1)
   {
        alert(message.alert);
        window.location.href='http://localhost:3000/front'
   }
   else
   {
        alert(message.alert)
   }
}

async function newlink()
{
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('Id')
    let bodyData = await fetch(`http://localhost:3000/regenerate?id=${id}`,{
        method:"POST",
    });
    let al = await bodyData.json();
    if(al.code == 1)
    {
        alert(al.message)
        let activationlink = al.activationlink;
        let Id = al.id;
        document.getElementById('rgl').innerHTML = `link regenerated http://localhost:3000/active?ac=${activationlink}&Id=${Id} For Activating the account`
    }
    
}

async function fp()
{
    console.log("forgot password")
    let form = document.getElementById('forgotpassword');
    const data = new URLSearchParams(new FormData(form));
    let bodyData = await fetch(`http://localhost:3000/forgotpassword`,{
        method:"POST",
        headers: {
                'Content-Type': ' application/x-www-form-urlencoded'
        },
        body: data
    });
    let al = await bodyData.json();
    if(al.code == 1)
    {
        alert(al.message)
        let activationlink = al.activationlink;
        let Id = al.id;
        document.getElementById('fgl').innerHTML = `link regenerated http://localhost:3000/active?ac=${activationlink}&Id=${Id} For reseting the account`
    }
    else
    {
        alert(al.alert)
    }
}