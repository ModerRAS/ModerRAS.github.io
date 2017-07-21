# Writing At First
Python has a GIL so it can only use one core per process. So using multiprocessing can use more cores.
# About Python multiprocessing API
What I use is :
```
multiprocessing.Process(target = targetfunc, args = args)
```
It's to create a new object that contains a process .
`target` is to input a function that function need to be run on the process.
`args` is to input the parameters

This class has a `start()` function that can make this process start to run.

Also it has a `name` parameter to get its name. And `pid` parameter to get its pid.

`multiprocessing.cpu_count()` can get how many CPUs in your computer.

`multiprocessing.active_children()` can get all the active process. It's a list[Process]. You can get an iterator to get process from it.

# Writing In The End
This is a good way to use more than one cores in Python. It will be faster than use multi-thread. There still other reasons. But this way can make it faster is true if it don't need transport some data.
