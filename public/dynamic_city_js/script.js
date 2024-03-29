async function  changecity()
{
    let state = document.getElementById('state').value;
    let city = document.getElementById('city');
    
    if(state < 29)
    {
        city.disabled = false;
        city.innerHTML = '';
        let bodyData = await fetch(`http://localhost:3000/states?state= ${state}` , {
            method:"POST",
        });
        let dt = await bodyData.json();
        let cities = dt.cities;
        for(var i=0;i<cities.length;i++)
        {
            var option = document.createElement('option');
            option.value = i;
            option.text = `${cities[i].cityname}`;
            city.appendChild(option)
        }
    }
    else
    {
        city.disabled = true;        
    }
    
}