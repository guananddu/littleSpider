<?php // 摘取 W3school 教程
include("simple_html_dom.php");
// 修改最大执行时间
ini_set("max_execution_time", 2400); // s 40 分钟
// 修改此次的最大运行内存
ini_set("memory_limit", 1048576000); // Byte 1000 兆，即 1G
$url = "http://www.w3school.com.cn";
$root = dirname(__FILE__);
$rootpath = $root . "/data_catched/";
$html = file_get_html($url);
// 全部的链接信息都要放入 $information
$information = array();
if (!file_exit()) { // 根目录还没有开始
    // Find <div> which attribute id="navsecond",左边目录
    $left_list = $html -> find('div[id=navsecond]', 0);
     $big_course = $left_list -> find('h2');
     foreach($big_course as $value) {
        $course = $value -> plaintext;
        
         if (strrpos($course, 'W3School') || strrpos($course, '手册')) {
            
            continue; //略去三个目录
            
             } 
        $information[$course] = $course;
         mkdir($rootpath . "/" . $course);
        
         } 
    // $html->clear();//释放内存，防止 PHP 溢出错误 必要
    showmes('收录根目录文件夹结束...');
    
     // Find "left_list's" tag:'<ul>'
    $ul_list = $left_list -> find('ul');
     $count = -1;
     foreach($information as $h2 => $h2name) {
        $count ++;
         $li_one = $ul_list[$count] -> find('a');
         $num = -1;
         foreach($li_one as $avalue) {
            
            $num ++;
             $ahref = $url . ($avalue -> href); //得到链接
             $atext = $avalue -> plaintext; //得到目录
             // 处理 '/'=> '-'
            $atext = ereg_replace("\/", "-", $atext);
             // 放入数组
            $information['twotext'][$h2][$atext] = $atext;
             $information['twohref'][$h2][$atext] = $ahref;
            
             } 
        
        } 
    // 利用 foreach 建立二级目录
    foreach($information['twotext'] as $thekey => $thevalue) {
        
        foreach($thevalue as $secondname) {
            
            $path = $rootpath . $thekey . "/" . $secondname;
             // 放入数组
            $information['twopath'][$thekey][$secondname] = $path;
             // 建立目录
            mkdir($path);
            
             } 
        
        } 
    showmes('收录二级目录结束...');
     // 第三级目录开始收录放入 $information 数组
    foreach($information['twohref'] as $key => $value) {
        
        foreach($value as $key_a => $value_b) {
            
            $sec_url = $value_b;
             $sec_html = file_get_html($sec_url);
             $course_div = $sec_html -> find('div[id=course]', 0);
             $tag_a_list = $course_div -> find('a');
             // 已经找到了所有的 a 便签
            foreach($tag_a_list as $a_obj) {
                
                $a_href = $url . ($a_obj -> href);
                 $a_text = $a_obj -> plaintext;
                 // 处理 '/'=> '-'
                $a_text = ereg_replace("\/", "-", str_replace("?", "", $a_text));
                
                 // 放入数组
                $information['thirdtext'][$key][$key_a][$a_text] = $a_text;
                 $information['thirdhref'][$key][$key_a][$a_text] = $a_href;
                
                 } 
            $sec_html -> clear(); //释放内存，防止 PHP 溢出错误 必要
            
             } 
        
        } 
    showmes('放入数组成功...开始收集...');
     // 收集并写入数据
    foreach($information['thirdhref'] as $one_catalog => $one_catalog_arr) {
        
        foreach($one_catalog_arr as $two_catalog => $two_catalog_arr) {
            
            foreach($two_catalog_arr as $three_catalog => $three_catalog_href) {
                
                $third_html = file_get_html($three_catalog_href);
                 $third_content = $third_html -> find('div[id=maincontent]', 0);
                
                 // 放入路径
                $catch_path_putfile = $rootpath . $one_catalog . "/" . $two_catalog . "/" . $three_catalog . ".htm";
                 // Execute Saving...
                $final_str = $third_content -> outertext;
                 @file_put_contents($catch_path_putfile, $final_str);
                
                 } 
            $third_html -> clear(); //释放内存，防止 PHP 溢出错误 必要
            
             } 
        
        } 
    showmes('所有教程收集完毕!');
     write_array('information');
    
    } 
// 写入数组，自定义函数
function write_array($var_name)
{
     global $$var_name;
     file_put_contents($root . "/write_array/" . $var_name . ".php", "<?" . var_export($$var_name, true)) . "?>";
    } 
// 显示信息
function showmes($mes)
{
     echo "<br /><font color='red'>" . $mes . "</font><br />";
    } 
// 检查目录是否为空
function file_exit($filelastname = '')
{
     if ($filelastname != '') {
        
        $handle = opendir($root . '/data_catched/' . $filelastname);
        
         } else {
        
        $handle = opendir($root . '/data_catched');
        
         } 
    while (false !== ($file = readdir($handle))) {
        if ($file == '.' || $file == '..') {
            
            continue;
            
             } 
        $file_array[] = $file;
         } 
    
    if ($file_array == null) { // 没有文件
        
        return false;
        
         } 
    
    showmes('文件下 data_catched/' . $filelastname . ' 已经收录！');
     return true;
    } 
?>