---
layout: post
title: Try To Install An Arch Linux On The Virtual Machine
date: 2017-06-04 12:00:00 +08:00
tags: [Linux,Geek]
---

Before long I just in my senior high school. I try to install a arch Linux. Because I see a blog or a answer and find that if you want to study Linux try to use arch Linux or gentoo Linux. And it can be build as whatever you want. So at that time, I download an arch Linux and try to install it on the virtual machine named VMware. After I mount the ISO on the virtual machine, I found it just have a terminal. So I searched tutorials on the internet. Because at that time I can't over the wall, I can only use Baidu. So I searched tutorials for a long time. But I didn't find any useful tutorial. I just followed an old tutorial. So in the end, I failed to install that operating system. But now I think I can try it again because I have Google and arch Linux's wiki also some tutorials which seemed newer. So I think this time I may be succeed.

So this time I will say how to install a arch Linux on the VMware. Firstly, create a new virtual machine. I think it's easy. So I didn't say that. I just say I give virtual machine 1Gib memory and 20G hard disk. This time I just use legacy boot, because I try uefi boot and it may not work at virtual machine. Then I start the virtual machine. And it will show :

![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/boot.png)

Select the first one. And then you can see:

![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/run.png)

My hard disk is in /dev/sda.
So it need to use `cfdisk /dev/sda` to partition my virtual disk.
![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/cfdisk_select.png)
Select dos.

I give / 19G and give swap 1G.
![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/cfdisk_fin.png)
Then select write and then quit.

After quit, it need to `mkfs`. Using `mkfs.ext4 /dev/sda1`to make file system as ext4. Also the swap is need to be formatted. Using `mkswap /dev/sda2` and then `swapon /dev/sda2` to use swap.

Then `mount /dev/sda1 /mnt` to mount the new disk parted. And then `vim /etc/pacman.d/mirrorlist` to change a faster software source.

```
Server = http://mirrors.163.com/archlinux/$repo/os/$arch
Server = http://mirrors.cqu.edu.cn/archlinux/$repo/os/$arch
```

Add this on the top is OK.
Then flush the pacman `pacman -Syy`.
And start to install the system.

```
pacstrap -i /mnt base base-devel
```
![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/install_default.png)
Just press enter is OK. Then it will install.
![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/install_default_all.png)

Then use `genfstab -U -p /mnt/etc/fstab` to create fstab file (just a safety belt).
Then you can check that file in order to be safely.

Then join new system `arch-chroot /mnt /bin/bash `. Be safety and command `mkinitcpio -p linux `. Then `passwd`. After you press enter write your password. Then set host name `echo yourhostname &gt; /etc/hostname`. Then add it to `/etc/hosts` as:

```
127.0.0.1 localhost.localdomain localhost yourhostname
::1 localhost.localdomain localhost yourhostname
```

Then download grub and install

```
pacman -S grub os-prober efibootmgr
grub-install --recheck /dev/sda
```

If using uefi :
```
grub-install --recheck /dev/sda --efi-directory=/boot
```

Then
# running

```
grub-mkconfig -o /boot/grub/grub.cfg
```

At one time I didn't run this, grub's boot UUID is not true.

Then make dhcp run when system run `systemctl enable dhcpcd.service`.

After I run it I get an error `Piix4_SMBus: 000:00:07.3: Host SMBus controller bus not enabled`. I searched on the Google and find a question in ask Ubuntu the same as mine. Just adding a black list in the system is OK. It's in the `/etc/modprobe.d/blacklist.conf`. Just adding `blacklist i2c-piix4` and saving then restart is OK.

The last error I get is `failed to start login service`. And I didn't find any useful answer. Also it is not appear when I restart and restart and restart.😥😥😥

Now it runs!
![](http://softlab.sdut.edu.cn/blog/yinjunbo/wp-content/uploads/sites/16/2017/06/sucess.png)
