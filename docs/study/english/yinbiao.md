# 音标

>视频来源：小红书

<iframe id="iframe" height=1850 width=80% frameborder=0 allowfullscreen="true" src="../../video/english.html"></iframe>
<script>
function iframeLoad() {
    console.log("加载")
    document.getElementById("iframe").height=0;
    document.getElementById("iframe").height=document.getElementById("iframe").contentWindow.document.body.scrollHeight + 30;
    console.log("结束")
}
window.onload = function () {
    setTimeout(() => {
        iframeLoad();
    }, 0);
}
</script>