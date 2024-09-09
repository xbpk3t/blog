---
title: 常用mysql sql整理
date: 2024-08-01
---



```yaml
# 添加索引
CREATE FULLTEXT INDEX index_name ON table_name (field_to_index);

# 删除索引
DROP INDEX index_name ON table_name;

# 查看索引
SHOW INDEX FROM table_name;

```


```yaml
# 硬删除数据库数据后，清除对应文件，从而优化索引效率的
OPTIMIZE TABLE table_name;

# 查看 MySQL 是否支持分表
SHOW VARIABLES LIKE '%partition%';

# 查看当前进程列表
SHOW PROCESSLIST;
```


```yaml

# 字符串函数
SELECT LEFT('string', length), RIGHT('string', length), SUBSTR('string', start, length), SUBSTRING_INDEX('string', delimiter, count);

# 将字符串转换为日期类型
SELECT CAST(date AS DATE) AS date FROM table1;

# string转int
SELECT CAST('123' AS SIGNED);

# 聚合函数
SELECT AVG(column_name), MIN(column_name), MAX(column_name), COUNT(column_name), SUM(column_name) FROM table_name;

# 聚合字符串
SELECT GROUP_CONCAT(column_name ORDER BY another_column_name SEPARATOR 'separator');

# 控制流函数if(), ifnull(), when case
SELECT COUNT(IF(channel_type=1, IF(check_status=6,1,0),0)) FROM tougao_record WHERE accept_company_id=100;

# 时间戳按天分组
SELECT DATE_FORMAT(date_entered, "%Y-%m-%d") AS ud, COUNT(id) AS cs FROM ttrss_entries GROUP BY ud;

# 每个月的数据统计
SELECT MONTH(date_entered) AS month, COUNT(id) FROM ttrss_entries WHERE YEAR(date_entered) = 2020 GROUP BY month;

# xxx时间内的数据统计
SELECT COUNT(id) FROM ttrss_feeds WHERE DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= DATE(last_successful_update);

# 怎么获取格式化时间的差值
SELECT TIME_TO_SEC(TIMEDIFF(t2, t1)), TIMESTAMPDIFF(SECOND, t1, t2), UNIX_TIMESTAMP(t2) - UNIX_TIMESTAMP(t1);

# 按中文字母排序
SELECT * FROM tablename WHERE 1=1 ORDER BY CONVERT(name USING gbk) COLLATE gbk_chinese_ci ASC;

# 目前有分数散布在1-100的n组数据，怎么根据统计区间呢？
SELECT ELT(INTERVAL(score, 0, 60, 80, 100), '0-60', '60-80', '80-100') AS score_interval, COUNT(id) FROM student_score GROUP BY score_interval;


```


```yaml
# insert into ... on duplicate key update
INSERT INTO test_tbl (id, dr) VALUES (1, 2), (2, 3), (x, y) ON DUPLICATE KEY UPDATE dr=VALUES(dr);

# 批量插入时，如何不插入重复数据？
INSERT IGNORE INTO test_tbl (id, dr) VALUES (1, 2), (2, 3), (x, y);

# 不存在则插入，存在则修改
REPLACE INTO test_tbl (id, dr) VALUES (1, 2), (2, 3), (x, y);
```


- [MySQL CLI Cheatsheet](https://gist.github.com/hofmannsven/9164408)
