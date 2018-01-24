package com.mycompany.myapp;

import java.io.Closeable;
import java.util.*;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Collectors;
import java.util.stream.DoubleStream;
import java.util.stream.Stream;

public class Test {
    public static void main(String[] args) {
        ExecutorService service = Executors.newScheduledThreadPool(10);
        DoubleStream.of(3.14159,2.71828) // b1
            .forEach(c -> service.submit( // b2
                () -> System.out.println(10*c))); // b3
        service.execute(() -> System.out.println("Printed")); // b4
    }
}
