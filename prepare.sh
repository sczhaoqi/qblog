#down tinymce resource
wget -O lang.zip https://www.tiny.cloud/tinymce-services-azure/1/i18n/download/?langs=zh_CN
mv lang.zip public
cd public 
unzip -n lang.zip 
