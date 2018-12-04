---
layout: post
title: Nullreferenceexception错误
date: 2017-07-09 12:00:00 +08:00
tags: [Unity3d]
---

# 写在开始
今天跟着Unity的Survival Shooter 官方YouTube教程学习,但是到了NavMeshAgent那一部分的时候发现一个小错误,并不知道原因,在这里记录一下.
# 错误内容
```
NullReferenceException: Object reference not set to an instance of an object
EnemyMovement.Awake () (at Assets/Scripts/Enemy/EnemyMovement.cs:14)
```
# 错误出现的情况
本来这段代码应该实现怪物自动追踪玩家的运动的那一部分,但是实际上成了这样子:

[![Unity_NullReferenceException_1.png](https://i.loli.net/2018/12/04/5c05e6868b9b6.png)](https://i.loli.net/2018/12/04/5c05e6868b9b6.png)

转过来:

[![Unity_NullReferenceException_2.png](https://i.loli.net/2018/12/04/5c05e6872c1da.png)](https://i.loli.net/2018/12/04/5c05e6872c1da.png)

怪物只是原地踏步而已,并没有进行移动,然后在Google上找了一下这个的问题,找到了游戏蛮牛里面有人问到了同一个问题,但是也是一样,给的答案一样不可行.
# 解决方法
打印一下这个的Find到的对象看看:

代码:
```
using UnityEngine;
using System.Collections;

public class EnemyMovement : MonoBehaviour
{
    Transform player;
    //PlayerHealth playerHealth;
    //EnemyHealth enemyHealth;
    UnityEngine.AI.NavMeshAgent nav;


    void Awake ()
    {
        GameObject playerObj = GameObject.FindGameObjectWithTag("Player");
        player = playerObj.transform;
        print(playerObj);
        //playerHealth = player.GetComponent <PlayerHealth> ();
        //enemyHealth = GetComponent <EnemyHealth> ();
        nav = GetComponent <UnityEngine.AI.NavMeshAgent> ();
    }


    void Update ()
    {
        //if(enemyHealth.currentHealth > 0 && playerHealth.currentHealth > 0)
        //{
            nav.SetDestination (player.position);
        //}
        //else
        //{
        //    nav.enabled = false;
        //}
    }
}
```
效果:

[![Unity_NullReferenceException_3.png](https://i.loli.net/2018/12/04/5c05e687843ff.png)](https://i.loli.net/2018/12/04/5c05e687843ff.png)

发现这个居然是NULL.所以第一反应就是Player写错了,但是看了一下并没有错.于是就想一些其他的方法.
然后就试一下其他的方法,于是发现了在`GameObject`类里面有一个`Find`方法,只有这个方法在我试的时候成功运行没有任何错误,很是诡异.

有图有真相:

[![Unity_NullReferenceException_4.png](https://i.loli.net/2018/12/04/5c05e687e7686.png)](https://i.loli.net/2018/12/04/5c05e687e7686.png)

[![Unity_NullReferenceException_5.png](https://i.loli.net/2018/12/04/5c05e6882c8ec.png)](https://i.loli.net/2018/12/04/5c05e6882c8ec.png)

# 写在最后
网上有人说可能是Unity5.x删掉了某些API,导致了某些方法不可用,也许就是这个问题吧.但是毕竟是一个商业软件,而且闭源,也无从知晓,因为很碰巧就找到了一个替代的方式来解决这个无法找到的问题.所以有人说Unity对于独立开发者是一个史前巨坑嘛.
