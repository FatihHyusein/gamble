<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="og:title" content="CSGO Muffin" />
    <meta name="og:type" content="CSGO Skins jackpot referrals" />
    <meta name="og:url" content="http://www.csgomuffin.com/" />
    <meta name="og:image" content="http://www.csgomuffin.com/staticFiles/images/CSGO_media.png" />
    <meta property="og:image" content="http://www.csgomuffin.com/staticFiles/images/CSGO_media.png" />
    <meta name="og:description" content="The only place where you bet muffins and win CS:GO skins." />
    <meta name="og:site_name" content="CSGO Muffin" />

    <meta name="msapplication-TileColor" content="#ffffff"/>
    <meta name="msapplication-square150x150logo" content="staticFiles/icons/muffin.png"/>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="The only place where you bet muffins and win CS:GO skins.">
    <meta name="viewport"
    content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
    id="view-handler"/>
    <title>CSGO Muffin</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="dns-prefetch" href="/api/"/>
    <base href="/">

    <meta itemprop="name" content="CSGO Muffin">
    <meta itemprop="description" content="The only place where you bet muffins and win CS:GO skins">
    <meta itemprop="image" content="http://www.csgomuffin.com/staticFiles/images/CSGO_media.png">

    <meta name="twitter:card" content="product">
    <meta name="twitter:site" content="@publisher_handle">
    <meta name="twitter:title" content="CSGO Muffin">
    <meta name="twitter:description" content="The only place where you bet muffins and win CS:GO skins.">
    <meta name="twitter:creator" content="@author_handle">
    <meta name="twitter:image" content="http://www.csgomuffin.com/staticFiles/images/CSGO_media.png">
    <meta name="twitter:data1" content="$3">
    <meta name="twitter:label1" content="Jackpot">
    <meta name="twitter:data2" content="CS:GO">
    <meta name="twitter:label2" content="Skins">
</head>
<body>



<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78504798-2', 'auto');
  ga('send', 'pageview');

</script>


<script type="text/javascript">
    var _mfq = _mfq || [];
    (function() {
        var mf = document.createElement("script");
        mf.type = "text/javascript"; mf.async = true;
        mf.src = "//cdn.mouseflow.com/projects/54639039-ef6f-4bbc-aa68-860f6c22d613.js";
        document.getElementsByTagName("head")[0].appendChild(mf);
    })();
</script>

<div id="app"></div>

</body>


<script src="min/bundle.js" async></script>

<noscript id="deferred-styles">
    <link rel="stylesheet" href="../bundle.css" type="text/css"/>
</noscript>
<script>
    var token = "<?php echo $_SESSION['token'] ? $_SESSION['token'] : ''?>";
    var failMessage = '<?php echo $_SESSION['error']; $_SESSION['error'] = ''?>';

    var loadDeferredStyles = function() {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement);
        addStylesNode.parentElement.removeChild(addStylesNode);
    };
    var raf = requestAnimationFrame || mozRequestAnimationFrame ||
        webkitRequestAnimationFrame || msRequestAnimationFrame;
    if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
    else window.addEventListener('load', loadDeferredStyles);
</script>
</html>

