from bs4 import BeautifulSoup
import schedule

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.proxy import Proxy, ProxyType
from selenium.webdriver.common.by import By
import time

from random import seed
from random import randint

import os
from datetime import datetime

#import shadow_useragent


import smtplib
import config
global subject
global msg



# setup process grab user agent profiles
#ua = shadow_useragent.ShadowUserAgent()
#ua = ua.firefox

# main class function
class ExpediaBot(object):
    # setup
    def __init__(self):
        self.googlenews_url = "https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en"



        PROXY = "172.102.219.35:21314"
        proxy = Proxy({
            'proxyType': ProxyType.MANUAL,
            'httpProxy': PROXY,
            'ftpProxy': PROXY,
            'sslProxy': PROXY
        })

        self.profile = webdriver.FirefoxProfile()
        # self.profile.set_preference("browser.privatebrowsing.autostart", True)
        #self.profile.set_preference("general.useragent.override", ua)
        ## Disable CSS
        # self.profile.set_preference('permissions.default.stylesheet', 2)
        ## Disable images
        # self.profile.set_preference('permissions.default.image', 2)
        ## Disable JavaScript
        # self.profile.set_preference('javascript.enabled', False)
        ## Disable Flash
        # self.profile.set_preference('dom.ipc.plugins.enabled.libflashplayer.so','false')
        self.options = Options()

        self.driver = webdriver.Firefox(firefox_profile=self.profile,
                                        firefox_options=self.options,
                                        proxy=proxy)
        self.driver.set_window_position(0, 0)
        self.driver.set_window_size(1920, 1080)
        # Obtain the source
        self.html = self.driver.page_source
        self.soup = BeautifulSoup(self.html, 'html.parser')
        self.html = self.soup.prettify('utf-8')

    # login step
    def login(self):
        seed(1)
        self.driver.get(self.googlenews_url)
        time.sleep(randint(10, 15))

        new_url = self.driver.current_url

    def searchLinks(self):
        html = self.driver.page_source
        soup = BeautifulSoup(html, 'lxml')
        names = []
        # urls=[]
        # links=[]

        # links =self.driver.find_elements_by_css_selector("a[href*='article']")
        # for i in range(5):
        #     ele = links[i]
        #     ele.click()


        # for d in soup.findAll('a', {'class': {'DY5T1d'}}):
            #name = d.find('h3', attrs={
                #'class': 'truncate-lines-2 all-b-padding-half pwa-theme--grey-900 uitk-type-heading-500'})
            #if name is not None:
                #n = name.text
            # names.append(d)
        for img in soup.select('a[href] img'):
            link = img.find_parent('a', href=True)
            if "articles" in str(link):
                names.append(link)
        return names



    # scroll down gradually
    def scrollDown(self):
        y = 1000
        for timer in range(0,15):
             self.driver.execute_script("window.scrollTo(0, "+str(y)+")")
             y += 1000
             time.sleep(1)

    # helper function to extract only numbers from a string
    def get_num(self, x):
        if "\n" in x:
            s = x.split("\n",1)[1]
            return -1
        else:
            return int(''.join(ele for ele in x if ele.isdigit()))
  

# helper function to write results to a txt file for processing
def write_to_csv(names):
    now = datetime.now()

    # print("now = ", int(now.timestamp()))
    cwd = os.getcwd()
    
    writepath =os.path.join(cwd,"links.txt")
    print(writepath)
    if os.path.exists(writepath):
        append_write = 'a' # append if already exists
    else:
        append_write = 'w' # make a new file if not
    with open(writepath,  append_write) as file1:
        #titleString = "searching for " + title + " at " + dt_string + " using account = " + email
        #file1.write(titleString)
        #file1.write("\n")
        for i in range(0, len(names)):
            file1.write("https://news.google.com"+str(names[i].get('href')).replace('.',''))
            file1.write("\n")

# main function
def operation():
    old_file = 'C:\\User\\Leon\\hello\\links.txt'
    if os.path.isfile(old_file):
        os.remove(old_file)

    expedia_bot = ExpediaBot()
    i = expedia_bot.login()
    while i == -1:
       expedia_bot.close_session()
       del expedia_bot
       time.sleep(5)
       expedia_bot = ExpediaBot()
       i = expedia_bot.login()
    names=expedia_bot.searchLinks()
    #print(names)
    write_to_csv(names)
    '''
    try:
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.ehlo()
        server.starttls()
        server.login(config.EMAIL_ADDRESS,config.PASSWORD)
        message ='Subject:{}\n\n{}'.format(subject,msg)
        server.sendmail(config.EMAIL_ADDRESS,config.EMAIL_ADDRESS,message)
        server.quit()

        print("Success")
    except:
        print("fail")
    '''
def send_email():
    try:
        server = smtplib.SMTP('smtp.gmail.com:587')
        server.ehlo()
        server.starttls()
        server.login(config.EMAIL_ADDRESS, config.PASSWORD)
        message = 'Subject:{}\n\n{}'.format(subject, msg)
        server.sendmail(config.EMAIL_ADDRESS, config.EMAIL_ADDRESS, message)
        server.quit()

        print("Success")
    except:
        print("fail")




if __name__ == '__main__':
    subject = "Daily News Update"
    msg = "Here is your news update."
    #schedule.every().day.at("17:30").do(operation)

    # send_email()
    operation()
    '''
    while(1):
        schedule.run_pending()
        time.sleep(1)
    '''
    