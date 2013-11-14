<?php

/**
 * XSS过滤函数
 * @param {string} $inputStr 传入的字符串
 * @param {string} 返回过滤后的字符串
 */
function trimUTF7XssLeak($inputStr){
    $hasUTF7StrFlag  = false;
    $tempUTF7TestStr = array('+ADw-', '+AD4-', '+AH0APA-', '+/v8', '+AHs-');
    foreach($tempUTF7TestStr as $k => $v){
        if(strpos($inputStr, $v) !== FALSE){
            $hasUTF7StrFlag        = true;
            break;
        }
    }
    if($hasUTF7StrFlag){
        array_push($tempUTF7TestStr, 'nonxss', ' ');
        $inputStr = str_replace($tempUTF7TestStr, '', $inputStr);
        $inputStr = preg_replace('/script(.*)\/script/i', '', $inputStr);
        if($inputStr === ''){
            $inputStr = 'default';
        }
    }
    return $inputStr;
};