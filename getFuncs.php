<?php
// 信息采集
require("simple_html_dom.php");
// 修改最大执行时间
ini_set("max_execution_time", 2400);
ini_set("memory_limit", 1048576000);
$hrefs = array();
$url_1 = "http://www.xmcase.com/phplib.php"; //第一页
$url_2 = "http://www.xmcase.com/phplib.php?keys=&types=&page=2"; //第二页
$url_3 = "http://www.xmcase.com/phplib.php?keys=&types=&page=3"; //第三页
$count = 1;
while ($count <= 3) { // 为了完成页面跳转
    $str = "url_" . $count;
     $html = file_get_html($$str);
     $div_toolsubject = $html -> find('.toolsubject');
     foreach($div_toolsubject as $value) {
        
        $ahref = $value -> find('a', 0);
         $hrefs['href'][] = "http://www.xmcase.com/" . ($ahref -> href);
         // $hrefs['title'][] = $ahref->plaintext;
    } 
    unset($div_toolsubject);
     unset($html);
     unset($value);
     unset($ahref);
     $count ++;
    
    } 
// $hrefs 信息数组, 开始采集函数
foreach($hrefs['href'] as $links) {
    $content = file_get_html($links);
     $all = $content -> find('#us', 0);
     $hrefs['title'][] = $title = ereg_replace("\/", "_", ($all -> find('p.a_4', 0) -> plaintext)); // "/" => "_"
     $hrefs['content'][] = $content = $all -> outertext; //全部内容
    
     $put_path = "Pages/" . $title . ".htm";
     file_put_contents($put_path, $content);
    } 
?>