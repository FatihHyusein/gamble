<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <base href="/public/"/>
    <meta name=viewport content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <title>CSGO Muffin</title>
    <link rel="shortcut icon" href="favicon.ico" />
</head>
<body>
<div id="app"></div>

</body>
<script src="bundle.js" async></script>
<noscript id="deferred-styles">
    <link rel="stylesheet" href="bundle.css" type="text/css"/>
</noscript>
<script>
    var token = "<?php echo $_SESSION['token'] ? $_SESSION['token'] : '06c7567a20d92c102fc4f98e9a42b429'?>";
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

