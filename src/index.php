<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="msapplication-TileColor" content="#ffffff"/>
    <meta name="msapplication-square150x150logo" content="staticFiles/icons/muffin.png"/>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="csgo skins bet game">
    <meta name="viewport"
    content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
    id="view-handler"/>
    <title>CSGO Muffin</title>
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="dns-prefetch" href="/api/"/>
</head>
<body>
<div id="app"></div>

</body>

<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-WCJ7WR"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WCJ7WR');</script>
<!-- End Google Tag Manager -->

<script src="../min/bundle.js" async></script>
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

