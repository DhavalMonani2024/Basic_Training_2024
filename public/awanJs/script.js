function content(index){
    if(index == 1)
    {
        document.getElementById('secdtl').innerHTML = `<h2>The Best Managed Cloud Hosting for WordPress</h2>
        <p>We live and breathe wordpress. Our managed hosting for wordpress and woocommerece takes away cloud server related busniess do you can scale your website the way you want</p>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Unlimited Bandwidth</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Network Speed</p>
            </div>
        </div>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Turbo Power</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Xtreme Freedom</p>
            </div>
        </div>
        <div>
            <button class="mdtl">More Detail</button>
        </div>`;
    }
    if(index == 2)
    {
        document.getElementById('secdtl').innerHTML = `<h2>The Best Managed Cloud Hosting for Magento</h2>
        <p>We live and breathe Magento. Our managed hosting for magento and woocommerece takes away cloud server related busniess do you can scale your website the way you want</p>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Unlimited Speed</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Network Feasibilty</p>
            </div>
        </div>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Turbo handling</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Extreme data handling</p>
            </div>
        </div>
        <div>
            <button class="mdtl">More Detail</button>
        </div>`;
    }
    if(index == 3)
    {
        document.getElementById('secdtl').innerHTML = `<h2>The Best Managed Cloud Hosting for Laravel</h2>
        <p>We live and breathe Laravel. Our managed hosting for laravel and woocommerece takes away cloud server related busniess do you can scale your website the way you want</p>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Unlimited Bandwidth</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Network Speed</p>
            </div>
        </div>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Turbo Power</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Xtreme Freedom</p>
            </div>
        </div>
        <div>
            <button class="mdtl">More Detail</button>
        </div>`;
    }
    if(index == 4)
    {
        document.getElementById('secdtl').innerHTML = `<h2>The Best Managed Cloud Hosting for PHP</h2>
        <p>We live and breathe php. Our managed hosting for php and woocommerece takes away cloud server related busniess do you can scale your website the way you want</p>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Unlimited Bandwidth</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Network Speed</p>
            </div>
        </div>
        <div class="sr">
            <div class="sc">
                <p><img src="awanImages/Vector.png">Turbo Power</p>
            </div>
            <div class="sc">
                <p><img src="awanImages/Vector.png">Xtreme Freedom</p>
            </div>
        </div>
        <div>
            <button class="mdtl">More Detail</button>
        </div>`;
    }
}

function rightscroll()
{
    document.getElementById("r82").scrollBy({
        left: 100,
        behavior: "smooth",
      });
}

function leftscroll()
{
    document.getElementById("r82").scrollBy({
        left: -100,
        behavior: "smooth",
      });
}