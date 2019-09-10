# 5种类型的JS对比

<table>
    <tr>
        <th>JS种类</th>
        <th> 可访问的API</th>
        <th>DOM访问情况</th>
        <th>JS访问情况</th>
        <th>直接跨域</th>
    </tr>
    <tr>
        <td>injected script</td>
        <td>和普通JS无任何差别，不能访问任何扩展API</td>
        <td>可以访问</td>
        <td> 可以访问</td>
        <td> 不可以</td>
    </tr>
    <tr>
        <td>content script </td>
        <td>只能访问 extension、runtime等部分API</td>
        <td> 可以访问</td>
        <td>不可以</td>
        <td>不可以</td>
    </tr>
    <tr>
        <td>popup js</td>
        <td>可访问绝大部分API，除了devtools系列</td>
        <td> 不可直接访问</td>
        <td> 不可以</td>
        <td> 可以</td>
    </tr>
    <tr>
        <td>background js</td>
        <td> 可访问绝大部分API，除了devtools系列</td>
        <td>不可直接访问</td>
        <td> 不可以</td>
        <td> 可以</td>
    </tr>
    <tr>
        <td>devtools js</td>
        <td>只能访问 devtools、extension、runtime等部分API</td>
        <td> 可以</td>
        <td>可以</td>
        <td>不可以</td>
    </tr>
</table>

